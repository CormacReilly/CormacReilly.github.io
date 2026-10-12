# Cormac Reilly — Portfolio

Plain HTML/CSS/JS. No build step.

```
index.html      Home: intro, featured projects, focus areas
projects.html   All projects with tag filters
project.html    Detail page, rendered from data (project.html?id=...)
about.html      Bio, interests, leadership
resume.html     Web resume + PDF download
js/data.js      ← SITE info and PROJECTS — edit this to add content
js/main.js      Header/footer, theme toggle, rendering, animations
css/style.css   All styles; colors are tokens at the top
assets/         resume.pdf, headshot.jpg, projects/*.jpg
```

## Add a project

Copy an object in `PROJECTS` (`js/data.js`), change `id`, fill in fields.
Set `featured: true` to show it on the home page (max 3 shown).
Put images in `assets/projects/` and set `image: "assets/projects/name.jpg"`.

## Before publishing

- Add `assets/resume.pdf` — use a version **without your home address and phone**.
- Add a headshot: replace the placeholder in `about.html` (comment shows how).
- Set `SITE.github` in `js/data.js` (the icon appears once it's filled in).
- Keep project write-ups free of NDA, ITAR/EAR, or otherwise sensitive detail.

## Preview locally

```bash
python3 -m http.server 8000
```

## Deploy to GitHub Pages

1. Create a repo named `<username>.github.io` (site lives at that URL) or any name (site at `<username>.github.io/<repo>`).
2. Push these files to the `main` branch.
3. Repo → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/`.
