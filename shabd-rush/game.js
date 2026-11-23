/* ============ Shabd Rush — game logic ============ */
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const RUN_LEN = 12;
const TIME_MS = 15000;
const LETTERS = ['A', 'B', 'C', 'D'];

/* ---------------- storage ---------------- */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem('sr_' + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('sr_' + key, JSON.stringify(value)); } catch (e) {}
  }
};

let soundOn = store.get('sound', true) !== false;
let mode = ['all', 'hindi', 'english'].includes(store.get('mode', 'all')) ? store.get('mode', 'all') : 'all';

const best = {
  score: store.get('best', 0) || 0,
  games: store.get('games', 0) || 0,
  acc: store.get('acc', null)
};

/* ---------------- elements ---------------- */
const el = {
  bestScore: $('#bestScore'),
  gamesPlayed: $('#gamesPlayed'),
  bestAcc: $('#bestAcc'),
  playBtn: $('#playBtn'),
  soundBtn: $('#soundBtn'),
  installHint: $('#installHint'),
  modes: $$('.chip'),

  game: $('#game'),
  progress: $('#progress'),
  score: $('#score'),
  timerFill: $('#timerFill'),
  streak: $('#streak'),
  mult: $('#mult'),
  qtag: $('#qtag'),
  qtext: $('#qtext'),
  options: $('#options'),
  why: $('#why'),
  fiftyBtn: $('#fiftyBtn'),
  fiftyBadge: $('#fiftyBadge'),
  nextBtn: $('#nextBtn'),
  quitBtn: $('#quitBtn'),

  result: $('#result'),
  resEyebrow: $('#resEyebrow'),
  resScore: $('#resScore'),
  resMsg: $('#resMsg'),
  resCorrect: $('#resCorrect'),
  resAcc: $('#resAcc'),
  resStreak: $('#resStreak'),
  resBest: $('#resBest'),
  reviewWrap: $('#reviewWrap'),
  reviewList: $('#reviewList'),
  revCount: $('#revCount'),
  againBtn: $('#againBtn'),
  shareBtn: $('#shareBtn'),
  homeBtn: $('#homeBtn'),

  toast: $('#toast')
};

/* ---------------- sound (WebAudio, no files) ---------------- */
const sfx = (() => {
  let ctx = null;

  function ac() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, dur, type, vol, delay) {
    if (!soundOn) return;
    const c = ac();
    if (!c) return;
    const t0 = c.currentTime + (delay || 0);
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(vol || 0.07, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }

  return {
    unlock() { ac(); },
    tap()     { tone(760, 0.05, 'sine', 0.025, 0); },
    correct() { tone(659.25, 0.12, 'sine', 0.07, 0); tone(987.77, 0.18, 'sine', 0.05, 0.07); },
    wrong()   { tone(190, 0.18, 'sawtooth', 0.04, 0); tone(130, 0.28, 'sawtooth', 0.035, 0.08); },
    over()    { [523, 415, 330, 262].forEach((f, i) => tone(f, 0.2, 'triangle', 0.05, i * 0.1)); }
  };
})();

/* ---------------- utils ---------------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.toast.classList.remove('show'), 2000);
}

/* ---------------- timer ---------------- */
const timer = { raf: 0, left: TIME_MS, last: 0, running: false, onEnd: null };

function paintTimer() {
  const f = Math.max(0, timer.left / TIME_MS);
  el.timerFill.style.transform = 'scaleX(' + f + ')';
  el.timerFill.classList.toggle('is-low', f <= 0.3);
}

function tick(now) {
  if (!timer.running) return;
  let dt = now - timer.last;
  timer.last = now;
  if (dt > 120) dt = 120;            // app backgrounded / tab switch → don't punish
  timer.left -= dt;
  if (timer.left <= 0) {
    timer.left = 0;
    timer.running = false;
    paintTimer();
    if (timer.onEnd) timer.onEnd();
    return;
  }
  paintTimer();
  timer.raf = requestAnimationFrame(tick);
}

function startTimer() {
  stopTimer();
  timer.left = TIME_MS;
  timer.last = performance.now();
  timer.running = true;
  paintTimer();
  timer.raf = requestAnimationFrame(tick);
}

function stopTimer() {
  timer.running = false;
  cancelAnimationFrame(timer.raf);
}

/* ---------------- run state ---------------- */
let run = null;
let autoNext = null;

const byCat = (cat) => shuffle(window.QUESTIONS.filter(q => q.cat === cat));

/* har question ke options ko shuffle karo, taaki correct kabhi fixed slot pe na ho */
function prepare(q) {
  const opts = q.o.map((text, i) => ({ text, ok: i === q.a }));
  shuffle(opts);
  return {
    tag: q.tag,
    q: q.q,
    why: q.why,
    opts,
    correct: opts.findIndex(o => o.ok)
  };
}

function buildRun(m) {
  const groups = m === 'hindi'
    ? [byCat('hindi')]
    : m === 'english'
      ? [byCat('english'), byCat('words')]
      : [byCat('hindi'), byCat('english'), byCat('words')];

  const out = [];
  let i = 0;
  while (out.length < RUN_LEN && groups.some(g => g.length)) {
    const g = groups[i % groups.length];
    if (g.length) out.push(g.shift());
    i++;
  }
  return out.map(prepare);
}

/* ---------------- screens ---------------- */
function show(id) {
  ['home', 'game', 'result'].forEach(s => {
    const node = document.getElementById(s);
    if (node) node.classList.toggle('active', s === id);
  });
  window.scrollTo(0, 0);
}

/* ---------------- home ---------------- */
function renderHome() {
  el.bestScore.textContent = best.score;
  el.gamesPlayed.textContent = best.games;
  el.bestAcc.textContent = best.acc === null ? '—' : best.acc + '%';
  el.modes.forEach(c => {
    const on = c.dataset.mode === mode;
    c.classList.toggle('is-on', on);
    c.setAttribute('aria-pressed', String(on));
  });
  el.soundBtn.textContent = soundOn ? '🔊' : '🔇';
  el.soundBtn.classList.toggle('is-off', !soundOn);
  el.soundBtn.setAttribute('aria-pressed', String(soundOn));
}

/* ---------------- game ---------------- */
function startGame() {
  run = {
    list: buildRun(mode),
    i: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    correct: 0,
    wrong: [],
    fifty: 1,
    locked: false
  };
  buildProgress();
  renderScore();
  renderHud();
  show('game');
  renderQuestion();
}

function buildProgress() {
  el.progress.innerHTML = '';
  for (let i = 0; i < run.list.length; i++) {
    const seg = document.createElement('span');
    seg.className = 'seg';
    el.progress.appendChild(seg);
  }
}

function markProgress() {
  Array.from(el.progress.children).forEach((seg, i) => {
    seg.classList.toggle('done', i < run.i);
    seg.classList.toggle('cur', i === run.i);
  });
}

function renderScore() {
  el.score.textContent = run.score;
}

function renderHud(bump) {
  el.streak.innerHTML = '🔥 <b>' + run.streak + '</b> streak';
  el.streak.classList.toggle('hot', run.streak >= 3);
  const multiplier = 1 + Math.min(Math.floor(run.streak / 3), 3);
  el.mult.textContent = '×' + multiplier;
  if (bump) {
    el.mult.classList.remove('up');
    void el.mult.offsetWidth;
    el.mult.classList.add('up');
  }
}

function renderQuestion() {
  const q = run.list[run.i];
  run.locked = false;

  el.qtag.textContent = q.tag;
  el.qtext.textContent = q.q;
  el.why.hidden = true;
  el.nextBtn.hidden = true;
  el.fiftyBtn.disabled = run.fifty < 1;
  el.fiftyBadge.textContent = run.fifty;

  el.options.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.type = 'button';

    const key = document.createElement('span');
    key.className = 'opt__key';
    key.textContent = LETTERS[i];

    const txt = document.createElement('span');
    txt.textContent = opt.text;

    btn.append(key, txt);
    btn.addEventListener('click', () => answer(i));
    el.options.appendChild(btn);
  });

  markProgress();
  renderHud();
  startTimer();
}

function answer(idx) {
  if (!run || run.locked) return;
  run.locked = true;
  stopTimer();

  const q = run.list[run.i];
  const btns = $$('.opt', el.options);
  const remaining = timer.left;
  const right = idx >= 0 && idx === q.correct;

  btns.forEach(b => { b.disabled = true; });
  btns[q.correct].classList.add('correct');
  el.fiftyBtn.disabled = true;

  if (right) {
    run.streak += 1;
    run.bestStreak = Math.max(run.bestStreak, run.streak);
    run.correct += 1;

    const multiplier = 1 + Math.min(Math.floor((run.streak - 1) / 3), 3);
    const speed = Math.round(50 * (remaining / TIME_MS));
    const gain = (100 + speed) * multiplier;
    run.score += gain;

    floatScore(btns[idx], '+' + gain);
    burst(btns[idx]);
    sfx.correct();
  } else {
    if (idx >= 0) btns[idx].classList.add('wrong');
    run.streak = 0;
    run.wrong.push({ q: q.q, a: q.opts[q.correct].text });
    sfx.wrong();
  }

  renderScore();
  renderHud(right);

  el.why.hidden = false;
  el.why.innerHTML = right
    ? '<b>Sahi jawab!</b> ' + q.why
    : '<b>Sahi jawab: ' + q.opts[q.correct].text + '</b> — ' + q.why;

  const last = run.i === run.list.length - 1;
  el.nextBtn.hidden = false;
  el.nextBtn.textContent = last ? 'Result dekho →' : 'Aage →';

  clearTimeout(autoNext);
  autoNext = setTimeout(next, right ? 1500 : 2700);
}

function next() {
  clearTimeout(autoNext);
  if (!run) return;
  if (run.i >= run.list.length - 1) return endGame();
  run.i += 1;
  renderQuestion();
}

function useFifty() {
  if (!run || run.locked || run.fifty < 1) return;
  run.fifty = 0;
  el.fiftyBtn.disabled = true;
  el.fiftyBadge.textContent = '0';

  const q = run.list[run.i];
  const wrongIdx = shuffle(q.opts.map((_, i) => i).filter(i => i !== q.correct)).slice(0, 2);
  wrongIdx.forEach(i => {
    const b = el.options.children[i];
    b.classList.add('dim');
    b.disabled = true;
  });
  sfx.tap();
}

/* ---------------- effects ---------------- */
function burst(btn) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = btn.getBoundingClientRect();
  const cx = r.left + Math.min(r.width * 0.4, 130);
  const cy = r.top + r.height / 2;
  const colors = ['#34d399', '#a78bfa', '#f472b6', '#fbbf24'];
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    const ang = (Math.PI * 2 * i) / 10 + Math.random() * 0.4;
    const dist = 44 + Math.random() * 42;
    s.style.left = cx + 'px';
    s.style.top = cy + 'px';
    s.style.background = colors[i % colors.length];
    s.style.setProperty('--x', (Math.cos(ang) * dist).toFixed(1) + 'px');
    s.style.setProperty('--y', (Math.sin(ang) * dist).toFixed(1) + 'px');
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 760);
  }
}

function floatScore(btn, text) {
  const r = btn.getBoundingClientRect();
  const node = document.createElement('div');
  node.className = 'floatscore';
  node.textContent = text;
  node.style.left = (r.right - 46) + 'px';
  node.style.top = (r.top + 6) + 'px';
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 1050);
}

/* ---------------- result ---------------- */
function endGame() {
  stopTimer();
  clearTimeout(autoNext);
  if (!run) return;

  const total = run.list.length;
  const acc = Math.round((run.correct / total) * 100);
  const isRecord = run.score > best.score;

  best.games += 1;
  if (isRecord) best.score = run.score;
  if (best.acc === null || acc > best.acc) best.acc = acc;
  store.set('games', best.games);
  store.set('best', best.score);
  store.set('acc', best.acc);

  el.resScore.textContent = run.score;
  el.resCorrect.textContent = run.correct + '/' + total;
  el.resAcc.textContent = acc + '%';
  el.resStreak.textContent = run.bestStreak;
  el.resBest.textContent = best.score;

  el.resEyebrow.textContent = 'Run complete';
  let msg;
  if (acc >= 90) msg = 'Zaher! Tum to shabd ke ustaad ho 🏆';
  else if (acc >= 70) msg = 'Bahut badhiya — top level khel rahe ho 🔥';
  else if (acc >= 50) msg = 'Theek hai, thoda aur practice aur score udd jayega 💪';
  else msg = 'Koi baat nahi — har galat jawab ek naya shabd sikhata hai';
  el.resMsg.innerHTML = msg + (isRecord ? ' <span class="record">New best 🎉</span>' : '');

  el.reviewList.innerHTML = '';
  if (run.wrong.length) {
    run.wrong.forEach(w => {
      const li = document.createElement('li');
      const q = document.createElement('span');
      q.className = 'rq';
      q.textContent = w.q;
      const a = document.createElement('span');
      a.className = 'ra';
      a.textContent = '✓ ' + w.a;
      li.append(q, a);
      el.reviewList.appendChild(li);
    });
    el.revCount.textContent = run.wrong.length + ' galat';
    el.reviewWrap.hidden = false;
    el.reviewWrap.open = false;
  } else {
    el.reviewWrap.hidden = true;
  }

  renderHome();
  show('result');
  sfx.over();
  run = null;
}

async function shareScore() {
  const text = 'Shabd Rush me maine ' + el.resScore.textContent + ' score kiya — '
    + el.resAcc.textContent + ' accuracy! Tum try karo 👉';
  if (navigator.share) {
    try { await navigator.share({ title: 'Shabd Rush', text }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  try {
    await navigator.clipboard.writeText(text);
    toast('Score copy ho gaya ✂️');
  } catch (e) {
    toast(text);
  }
}

/* ---------------- events ---------------- */
el.playBtn.addEventListener('click', () => { sfx.unlock(); sfx.tap(); startGame(); });

el.modes.forEach(chip => {
  chip.addEventListener('click', () => {
    mode = chip.dataset.mode;
    store.set('mode', mode);
    renderHome();
    sfx.tap();
  });
});

el.soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  store.set('sound', soundOn);
  renderHome();
  if (soundOn) { sfx.unlock(); sfx.tap(); }
});

el.options.addEventListener('click', () => sfx.unlock(), { once: true });

el.fiftyBtn.addEventListener('click', useFifty);
el.nextBtn.addEventListener('click', next);

el.quitBtn.addEventListener('click', () => {
  stopTimer();
  clearTimeout(autoNext);
  run = null;
  show('home');
  renderHome();
  toast('Game chhoda — dobara try karo');
});

el.againBtn.addEventListener('click', () => { sfx.tap(); startGame(); });
el.shareBtn.addEventListener('click', shareScore);
el.homeBtn.addEventListener('click', () => { show('home'); renderHome(); });

/* desktop keyboard: 1-4 ya a-d se answer, Enter se next */
document.addEventListener('keydown', e => {
  if (!el.game.classList.contains('active')) return;
  const k = e.key.toLowerCase();
  if (['1', '2', '3', '4'].includes(k)) answer(Number(k) - 1);
  else if (['a', 'b', 'c', 'd'].includes(k)) answer(['a', 'b', 'c', 'd'].indexOf(k));
  else if (k === 'enter' || k === ' ') { e.preventDefault(); if (!el.nextBtn.hidden) next(); }
});

/* ---------------- boot ---------------- */
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
if (isStandalone) el.installHint.hidden = true;

renderHome();
show('home');

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
