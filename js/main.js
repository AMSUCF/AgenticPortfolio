/* =====================================================================
   main.js — nav, rendering from data.js, scroll-reveal, decor mounting.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Verify banner dismiss ---------- */
  const banner = document.getElementById("verifyBanner");
  const bannerClose = document.getElementById("verifyClose");
  if (bannerClose) bannerClose.addEventListener("click", () => banner.classList.add("is-hidden"));

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // close menu after choosing a link (mobile)
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Render helpers ---------- */
  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function renderInterests() {
    const list = document.getElementById("interestList");
    if (!list || !window.SITE) return;
    SITE.interests.forEach((i) => list.appendChild(el("li", null, i)));
  }

  // Shared card builder for publications + projects
  function buildCard({ year, title, meta, desc, link, tag }) {
    const card = el("article", "card");
    if (year) card.appendChild(el("span", "card__year", String(year)));
    if (tag) card.appendChild(el("span", "card__tag", tag + " · "));
    card.appendChild(el("h3", "card__title", title));
    if (meta) card.appendChild(el("p", "card__meta", meta));
    if (desc) card.appendChild(el("p", "card__desc", desc));
    if (link) {
      const a = el("a", "card__link", "Explore &raquo;");
      a.href = link; a.target = "_blank"; a.rel = "noopener";
      card.appendChild(a);
    }
    return card;
  }

  function renderPublications() {
    const grid = document.getElementById("pubGrid");
    const filters = document.getElementById("pubFilters");
    if (!grid || !window.SITE) return;

    const pubs = SITE.publications;
    const types = ["All", ...Array.from(new Set(pubs.map((p) => p.type)))];

    function paint(type) {
      grid.innerHTML = "";
      pubs
        .filter((p) => type === "All" || p.type === type)
        .forEach((p) => grid.appendChild(buildCard({ ...p, tag: p.type })));
      observeReveals(grid);
    }

    types.forEach((type, i) => {
      const pill = el("button", "filter-pill" + (i === 0 ? " is-active" : ""), type);
      pill.type = "button";
      pill.addEventListener("click", () => {
        filters.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("is-active"));
        pill.classList.add("is-active");
        paint(type);
      });
      filters.appendChild(pill);
    });

    paint("All");
  }

  function renderProjects() {
    const grid = document.getElementById("projectGrid");
    if (!grid || !window.SITE) return;
    SITE.projects.forEach((pr) => grid.appendChild(buildCard(pr)));
  }

  function renderLinks() {
    const list = document.getElementById("linkList");
    if (!list || !window.SITE) return;
    SITE.links.forEach((l) => {
      const li = el("li");
      const a = el("a", null, `<span aria-hidden="true">${l.icon}</span> ${l.label}`);
      a.href = l.url;
      if (l.url.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /* ---------- Scroll reveal ---------- */
  let revealObserver = null;
  function ensureRevealObserver() {
    if (revealObserver || !("IntersectionObserver" in window)) return;
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
  }
  function observeReveals(scope) {
    ensureRevealObserver();
    const targets = (scope || document).querySelectorAll(".card");
    targets.forEach((t) => {
      t.classList.add("reveal");
      if (revealObserver) revealObserver.observe(t);
      else t.classList.add("is-visible");
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  function setupScrollSpy() {
    const links = Array.from(document.querySelectorAll(".navbar__link"));
    const map = new Map();
    links.forEach((l) => {
      const id = l.getAttribute("href").slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, l);
    });
    if (!("IntersectionObserver" in window) || map.size === 0) return;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          map.get(e.target).classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, sec) => spy.observe(sec));
  }

  /* ---------- Mount ambient decor sketches (pause when offscreen) ---------- */
  function mountDecor() {
    if (typeof window.makeDecorSketch !== "function") return;
    const sections = [
      { host: "aboutCanvas",    palette: ["#B7E59A", "#FFD93D", "#A2D2FF"] },
      { host: "pubsCanvas",     palette: ["#FFD93D", "#8BD450", "#FF6B6B"] },
      { host: "projectsCanvas", palette: ["#A2D2FF", "#8BD450", "#FFD93D"] },
    ];
    sections.forEach(({ host, palette }) => {
      const node = document.getElementById(host);
      const inst = window.makeDecorSketch(host, palette);
      if (!node || !inst || !("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (typeof inst.loop !== "function") return;
          if (e.isIntersecting) inst.loop(); else inst.noLoop();
        });
      }, { threshold: 0 });
      io.observe(node);
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderInterests();
    renderPublications();
    renderProjects();
    renderLinks();
    observeReveals(document);
    setupScrollSpy();
    mountDecor();
  });
})();
