# Developer Portfolio (static, GitHub Pages ready)

## Edit content
- `data/site.json`: name, email, titles, **social links**, about text, stats, skills (values are placeholders).
- `data/projects.json`: all projects. **Add a project = add an object** to `webDesigning` or `fullStack`, then drop its files in `assets/images/<id>/` and `assets/videos/<id>/`.
  Fields: id, title, short, description, cover, technologies, liveUrl, githubUrl, objectives, features, details, screenshots[], videos[].
- Missing images automatically show a generated placeholder, so nothing breaks while you add real assets.
- Put your CV at `assets/cv/cv.pdf`.
- Contact form: leave `formspreeId` empty to use the mailto fallback, or create a free form at formspree.io and paste its ID.

## Pages
`index.html` (Home/About/Skills/Contact) · `portfolio.html` · `project.html?id=…` · `gallery.html?id=…` (full-stack media only for that id).

## Run locally
`python -m http.server 8000` then open http://localhost:8000 (fetching JSON does not work from `file://`).

## Deploy on GitHub Pages
1. Create a repo and push this folder's contents to the `main` branch (index.html at the repo root).
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)` → Save.
3. Your site appears at `https://<user>.github.io/<repo>/`. All paths are relative, so it works under a repo sub-path.

## Pages
`index.html` (home) · `about.html` · `skills.html` · `contact.html` · `portfolio.html`. Text for About, Skills, FAQ and journey lives in `data/site.json`.

## Offline / blocked CDN
Bootstrap loads from jsDelivr and automatically falls back to `vendor/` if that fails (a copy of Bootstrap is included).
Icons (Bootstrap Icons) also load from the CDN. For fully offline use, download bootstrap-icons 1.11.3 and place `bootstrap-icons.css` and its `fonts/` folder in `vendor/bootstrap-icons/`.
