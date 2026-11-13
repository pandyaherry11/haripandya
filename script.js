/* =========================================================
   haripandya.com — interactions
   ========================================================= */
(function () {
  "use strict";

  const doc = document.documentElement;
  const header = document.getElementById("site-header");
  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menu-toggle");
  const themeToggle = document.getElementById("theme-toggle");
  const toastEl = document.getElementById("toast");
  const form = document.getElementById("contact-form");
  const yearEl = document.getElementById("year");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- current year ---------- */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- theme ---------- */
  const storedTheme = localStorage.getItem("hp-theme");
  const initialTheme = storedTheme || "dark";
  setTheme(initialTheme);

  function setTheme(theme) {
    doc.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
    localStorage.setItem("hp-theme", theme);
  }

  themeToggle.addEventListener("click", function () {
    setTheme(doc.getAttribute("data-theme") === "light" ? "dark" : "light");
  });

  /* ---------- sticky header ---------- */
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  menuToggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });

  /* ---------- active nav link ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    /* Safety net: if IntersectionObserver never delivers (page hidden,
       throttled tab, browser quirk), never leave content invisible. */
    setTimeout(function () {
      if (document.querySelectorAll(".reveal.in").length > 0) return;
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }, 2500);
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (reduceMotion) {
      el.textContent = String(target);
      return;
    }
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- service card spotlight ---------- */
  document.querySelectorAll(".service-card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      card.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
  });

  /* ---------- toast ---------- */
  let toastTimer;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 3800);
  }

  /* ---------- forms: validate fields + hand off to email app ---------- */
  function markValidity(fields) {
    let valid = true;
    fields.forEach(function (field) {
      const value = field.value.trim();
      const emailOk =
        field.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const ok = value.length > 0 && emailOk;
      field.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });
    return valid;
  }

  function wireMailtoForm(formEl, buildSubject) {
    if (!formEl) return;

    formEl.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = formEl.elements.namedItem("name");
      const email = formEl.elements.namedItem("email");
      const message = formEl.elements.namedItem("message");
      const service = formEl.elements.namedItem("service");
      const fields = [name, email, message].concat(service ? [service] : []);

      if (!markValidity(fields)) {
        showToast("Please fill in all fields with a valid email.");
        const firstInvalid = formEl.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const serviceValue = service ? service.value : "";
      const subject = encodeURIComponent(
        buildSubject(serviceValue, name.value.trim())
      );
      const body = encodeURIComponent(
        message.value.trim() +
        "\n\n— " + name.value.trim() +
        "\n" + email.value.trim() +
        (serviceValue ? "\nService: " + serviceValue : "")
      );

      window.location.href =
        "mailto:pandyaherry11@gmail.com?subject=" + subject + "&body=" + body;

      showToast("Opening your email app…");
      formEl.reset();
    });

    formEl.querySelectorAll("input, textarea, select").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("invalid");
      });
      field.addEventListener("change", function () {
        field.classList.remove("invalid");
      });
    });
  }

  wireMailtoForm(form, function (service, name) {
    return "Project enquiry from " + name;
  });

  wireMailtoForm(document.getElementById("apply-form"), function (service, name) {
    return "Application" + (service ? " — " + service : "") + " from " + name;
  });

  /* ---------- smooth scroll fallback for older browsers ---------- */
  if (!("scrollBehavior" in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        window.scrollTo(0, target.offsetTop - 90);
      });
    });
  }
})();
