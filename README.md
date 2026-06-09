# 🐸🍳 Anastasia Salter — Portfolio

A mobile-first, responsive academic portfolio for **Anastasia Salter**, digital
humanities & game studies scholar. Built with **vanilla HTML/CSS/JS** and lots of
**P5.js** animation, in a cute aesthetic drawing on **Keroppi** greens and
**Gudetama** yolk yellows — with a landing page styled as an **old-school Flash
cartoon** (a wink at her book *Flash: Building the Interactive Web*).

## ✨ Features

- **Flash-style cartoon landing** (`js/sketches/landing.js`) — an animated pond
  world with a sleepy yolk sun, a blinking froggy, a lazy egg, drifting 90s/Memphis
  shapes, and a nostalgic "loading…" preloader intro beat.
- **Ambient P5 backgrounds** (`js/sketches/decor.js`) — one reusable shape factory
  mounted behind each section, paused automatically when scrolled offscreen.
- **Data-driven content** — edit one file (`js/data.js`) to update everything.
- **Responsive & accessible** — mobile-first layout, hamburger nav, scroll-reveal,
  WCAG-tuned text, decorative canvases hidden from screen readers, and a
  `prefers-reduced-motion` mode that freezes the animations to a static frame.

## 🗂 Structure

```
index.html               # page markup + section anchors
css/styles.css           # design tokens + mobile-first responsive styles
js/data.js               # ← EDIT THIS: bio interests, books, projects, links
js/main.js               # nav, rendering, scroll-reveal, sketch mounting
js/sketches/landing.js   # Flash-style cartoon landing scene
js/sketches/decor.js     # reusable ambient 90s-shape backgrounds
assets/                  # favicon, portrait placeholder, OG image (SVG)
.github/workflows/deploy.yml  # GitHub Pages deploy
```

## ▶️ Run locally

No build step. Serve the folder over HTTP (P5 + module loading prefer a server):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## ✏️ Edit content

Everything is in **`js/data.js`**:

- `interests` — pills in the About section
- `publications` — books (a `type` drives the filter pills)
- `projects` — projects / games / teaching / communities
- `links` — contact & social links

Swap `assets/portrait-placeholder.svg` for a real photo (keep the filename or update
the `<img src>` in `index.html`).

> ⚠️ **Verify before launch.** Bio, roles, publications, and links were researched
> from public sources and are flagged with a draft banner + `TODO: verify` comments.
> Confirm and correct them, then remove the banner in `index.html`.

## 🚀 Deploy (GitHub Pages)

1. Push to the repo.
2. In **Settings → Pages → Build and deployment**, set **Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` publishes the site on push.
