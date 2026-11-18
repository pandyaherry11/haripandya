# haripandya.com

**Live:** https://pandyaherry11.github.io/haripandya/ (free GitHub Pages)

Hari Pandya ka personal portfolio — plain HTML, CSS aur JavaScript. Koi framework,
koi build step nahi. Bas file kholo aur chalao.

> Note: `haripandya.com` domain abhi kharida nahi gaya hai. Domain lene ke baad
> `index.html` ke OG tags, `robots.txt` aur `sitemap.xml` me URL badalna hoga,
> aur root me `CNAME` file (`haripandya.com`) wapas add karni hogi.

## Files

```
index.html   → saara page content (sections, text, links)
share.html   → URL + QR share page (application form me paste karne ke liye)
style.css    → design, layout, animations, light/dark theme
script.js    → theme toggle, mobile menu, scroll animations, contact form
```

## Local pe kaise chalao

Option 1 — file ko browser me kholo:

```bash
open index.html
```

Option 2 — local server (better, kyunki fonts aur paths sahi load hote hain):

```bash
python3 -m http.server 8000
# phir kholo: http://localhost:8000
```

## Kya-kya edit karna hai

| Kya badalna hai | Kahan |
| --- | --- |
| Naam, intro, tagline | `index.html` → hero section |
| About text aur skills | `index.html` → `#about` |
| Services | `index.html` → `#services` |
| Application form | `index.html` → `#apply` (service dropdown options bhi wahin) |
| Email address | `index.html` + `script.js` (`pandyaherry11@gmail.com` ko replace karo) |
| Social links | `index.html` → `.socials` me `href` |
| Profile photo | `assets/hari-pandya.jpg` (replace karo, same naam rakho) |
| Bhajan video | `assets/video/hanuman-chalisa.mp4` + poster `assets/video/hanuman-poster.jpg` |
| Colors | `style.css` → `:root` me `--accent`, `--accent-2`, `--accent-3` |
| Default theme | `script.js` → `initialTheme` (`"dark"` ya `"light"`) |

Tip: email ko ek hi jagah rakhna ho to `pandyaherry11@gmail.com` ko dhoondh ke
sab jagah apna address daal do (HTML me 2 jagah, JS me 1 jagah).

## haripandya.com live kaise kare (free)

### Netlify (sabse aasan)
1. [netlify.com](https://netlify.com) pe account banao.
2. `Default Project` folder ko Netlify ke "Deploy" area me **drag & drop** karo.
3. Site live ho jayegi (jaise `hari-pandya.netlify.app`).
4. **Domain settings → Add custom domain** → `haripandya.com` daalo.
5. Netlify jo nameservers de, woh domain registrar (GoDaddy / Namecheap) me
   daal do. DNS propagate hone me 10 min – 24 hours lag sakte hain.

### Vercel
1. [vercel.com](https://vercel.com) pe account banao.
2. Project import karo (GitHub repo se ya folder upload karke).
3. **Settings → Domains** me `haripandya.com` add karo aur DNS records follow karo.

### GitHub Pages
```bash
git add .
git commit -m "Add portfolio site"
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```
Phir repo → Settings → Pages → source `main` / root select karo.
`CNAME` file banao jisme sirf `haripandya.com` likha ho, aur registrar me
GitHub ke A records / CNAME set karo.

## Note

- Dono forms FormSubmit se seedha `pandyaherry11@gmail.com` par jaate hain. Agar
  online send fail ho jaye to email app fallback khulta hai. Endpoint `script.js`
  me `FORM_ENDPOINT` par hai.
- Site fully responsive hai, light/dark theme support karti hai, aur
  `prefers-reduced-motion` respect karti hai.
