(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const page = document.body.dataset.page;

  const svg = (inner) =>
    `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  const icons = {
    sun: svg('<circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>'),
    moon: svg('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),
    mail: svg('<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/>'),
    github: svg('<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'),
    linkedin: svg('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'),
    arrowLeft: svg('<path d="M19 12H5M12 19l-7-7 7-7"/>'),
    arrowRight: svg('<path d="M5 12h14M12 5l7 7-7 7"/>'),
    external: svg('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>'),
  };

  /* ---------- Header / footer ---------- */

  const NAV = [
    ["home", "index.html", "Home"],
    ["projects", "projects.html", "Projects"],
    ["about", "about.html", "About"],
    ["resume", "resume.html", "Resume"],
  ];

  function renderHeader() {
    const header = $(".site-header");
    if (!header) return;
    const active = page === "project" ? "projects" : page;
    header.innerHTML = `
      <div class="container nav">
        <a class="brand" href="index.html" aria-label="${esc(SITE.name)}, home">
          <span class="brand-mark">CR</span><span class="brand-name">${esc(SITE.name)}</span>
        </a>
        <nav aria-label="Main">
          <ul>${NAV.map(
            ([id, href, label]) => `<li><a href="${href}"${id === active ? ' aria-current="page"' : ""}>${label}</a></li>`
          ).join("")}</ul>
        </nav>
        <button class="theme-toggle" type="button" aria-label="Toggle dark mode">
          <span class="icon-moon">${icons.moon}</span><span class="icon-sun">${icons.sun}</span>
        </button>
      </div>`;
    initThemeToggle($(".theme-toggle", header));
  }

  function renderFooter() {
    const footer = $(".site-footer");
    if (!footer) return;
    const links = [
      SITE.email && [`mailto:${SITE.email}`, "Email", icons.mail],
      SITE.github && [SITE.github, "GitHub", icons.github],
      SITE.linkedin && [SITE.linkedin, "LinkedIn", icons.linkedin],
    ].filter(Boolean);
    footer.innerHTML = `
      <div class="container footer">
        <p>© ${new Date().getFullYear()} ${esc(SITE.name)}</p>
        <ul class="social">${links
          .map(([href, label, icon]) => `<li><a href="${esc(href)}" aria-label="${label}" title="${label}">${icon}</a></li>`)
          .join("")}</ul>
      </div>`;
  }

  /* ---------- Theme ---------- */

  function initThemeToggle(btn) {
    const root = document.documentElement;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const current = () => root.dataset.theme || (mq.matches ? "dark" : "light");
    const sync = () => btn.setAttribute("aria-pressed", String(current() === "dark"));
    btn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
    mq.addEventListener?.("change", sync);
    sync();
  }

  /* ---------- Project rendering ---------- */

  const projectUrl = (p) => `project.html?id=${encodeURIComponent(p.id)}`;
  const tagList = (tags) => `<ul class="tags">${tags.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>`;

  function thumb(p, cls = "thumb") {
    if (p.image) return `<div class="${cls}"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.title)}" loading="lazy"></div>`;
    return `<div class="${cls} thumb-placeholder" aria-hidden="true"><span>${esc(p.tags[0] || "Project")}</span></div>`;
  }

  function card(p, i) {
    return `
      <article class="card reveal" data-index="${i}">
        <a class="card-link" href="${projectUrl(p)}">
          ${thumb(p)}
          <div class="card-body">
            <p class="card-meta">${esc(p.dates)}${p.status ? ` · ${esc(p.status)}` : ""}</p>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.summary)}</p>
            ${tagList(p.tags)}
          </div>
        </a>
      </article>`;
  }

  function renderFeatured() {
    const grid = $("#featured-grid");
    if (!grid) return;
    grid.innerHTML = PROJECTS.filter((p) => p.featured).slice(0, 3).map(card).join("");
  }

  function renderProjects() {
    const grid = $("#project-grid");
    const bar = $("#filters");
    if (!grid || !bar) return;

    const tags = ["All", ...new Set(PROJECTS.flatMap((p) => p.tags))];
    let active = new URLSearchParams(location.search).get("tag");
    if (!tags.includes(active)) active = "All";

    bar.innerHTML = tags
      .map((t) => `<button type="button" class="filter" data-tag="${esc(t)}">${esc(t)}</button>`)
      .join("");
    grid.innerHTML = PROJECTS.map(card).join("");
    const cards = [...grid.querySelectorAll(".card")];
    const count = $("#project-count");

    function apply() {
      bar.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tag === active)));
      let shown = 0;
      cards.forEach((c) => {
        const match = active === "All" || PROJECTS[c.dataset.index].tags.includes(active);
        c.hidden = !match;
        if (match) { shown++; c.classList.add("is-visible"); }
      });
      if (count) count.textContent = `${shown} project${shown === 1 ? "" : "s"}`;
      const url = new URL(location.href);
      active === "All" ? url.searchParams.delete("tag") : url.searchParams.set("tag", active);
      history.replaceState(null, "", url);
    }

    bar.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      active = b.dataset.tag;
      apply();
    });
    apply();
  }

  function renderProject() {
    const root = $("#project");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id");
    const i = PROJECTS.findIndex((p) => p.id === id);

    if (i < 0) {
      root.innerHTML = `
        <h1>Project not found</h1>
        <p class="lede">That project doesn't exist or has moved.</p>
        <p><a class="btn" href="projects.html">${icons.arrowLeft} All projects</a></p>`;
      return;
    }

    const p = PROJECTS[i];
    const prev = PROJECTS[i - 1];
    const next = PROJECTS[i + 1];
    document.title = `${p.title} · ${SITE.name}`;

    const paragraphs = (body) => [].concat(body).map((t) => `<p>${esc(t)}</p>`).join("");

    root.innerHTML = `
      <a class="back-link" href="projects.html">${icons.arrowLeft} All projects</a>
      <header class="project-header">
        ${tagList(p.tags)}
        <h1>${esc(p.title)}</h1>
        <p class="lede">${esc(p.summary)}</p>
        <dl class="project-meta">
          <div><dt>Timeline</dt><dd>${esc(p.dates)}</dd></div>
          ${p.status ? `<div><dt>Status</dt><dd>${esc(p.status)}</dd></div>` : ""}
          ${p.highlights?.length ? `<div><dt>Highlights</dt><dd>${p.highlights.map(esc).join("<br>")}</dd></div>` : ""}
        </dl>
      </header>
      ${thumb(p, "project-hero")}
      <div class="project-body">
        <div class="prose">
          ${(p.sections || []).map((s) => `<section class="reveal"><h2>${esc(s.heading)}</h2>${paragraphs(s.body)}</section>`).join("")}
          ${p.todo?.length ? `
            <aside class="coming-soon reveal">
              <p class="label">More detail coming</p>
              <ul>${p.todo.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
            </aside>` : ""}
        </div>
        <aside class="project-side">
          ${p.tools?.length ? `<h2 class="label">Tools &amp; skills</h2>${tagList(p.tools)}` : ""}
          ${p.links?.length ? `<h2 class="label">Links</h2><ul class="link-list">${p.links
            .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${icons.external}</a></li>`)
            .join("")}</ul>` : ""}
        </aside>
      </div>
      ${prev || next ? `
        <nav class="pager" aria-label="More projects">
          ${prev ? `<a href="${projectUrl(prev)}"><span class="label">${icons.arrowLeft} Previous</span>${esc(prev.title)}</a>` : "<span></span>"}
          ${next ? `<a href="${projectUrl(next)}" class="next"><span class="label">Next ${icons.arrowRight}</span>${esc(next.title)}</a>` : ""}
        </nav>` : ""}`;
  }

  /* ---------- Scroll reveal ---------- */

  function initReveal() {
    const els = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  renderHeader();
  renderFooter();
  renderFeatured();
  renderProjects();
  renderProject();
  document.querySelectorAll("[data-resume-pdf]").forEach((a) => (a.href = SITE.resumePdf));
  initReveal();
})();
