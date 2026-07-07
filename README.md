# Zeogital Consulting — Website

Static four-page site (HTML/CSS/JS, no build step). Deploys on Netlify via GitHub.

## File structure

```
zeogital-site/
├── index.html        Homepage
├── about.html        Story, founder profile, certifications
├── services.html     Six service areas + engagement steps
├── contact.html      Netlify-powered contact form
├── success.html      Thank-you page after form submission
├── styles.css        All styling (shared by every page)
├── main.js           Mobile menu + homepage shield animation
└── images/
    ├── logo.svg                  ← replace with your real logo
    ├── favicon.svg               ← replace with your real favicon
    └── founder-placeholder.svg   ← replace with a real headshot
```

## Replacing the placeholder images

**Logo:** drop your real logo into `images/` and either name it `logo.svg`
(overwriting the placeholder) or update the `src="images/logo.svg"` lines in
each HTML file. The logo displays at 38px tall in the header and 30px in the
footer on a dark navy background, so a light or gold logo works best.
PNG works too — just change the filename in the HTML.

**Founder photo:** add e.g. `images/founder.jpg`, then in `about.html` change
`src="images/founder-placeholder.svg"` to `src="images/founder.jpg"`.
A square photo of at least 300×300px will look sharp.

**Favicon:** replace `images/favicon.svg`, or swap in a `favicon.png` and
update the `<link rel="icon" ...>` tag near the top of each HTML file.

## First-time setup: GitHub → Netlify

1. Create a new repository on github.com (e.g. `zeogital-website`), no README needed.
2. In a terminal, from inside this folder:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/zeogital-website.git
   git push -u origin main
   ```
3. In Netlify: **Add new site → Import an existing project → GitHub**, pick the repo.
4. Build settings: leave **Build command** empty, set **Publish directory** to `/` (root). Deploy.

From then on, every `git push` auto-deploys the site in under a minute.

## Making updates

```
git add .
git commit -m "Describe what changed"
git push
```

Netlify keeps a history of every deploy, so you can roll back to any previous
version from the Netlify dashboard (Deploys → pick one → Publish deploy).

## Contact form

The form uses Netlify Forms (`data-netlify="true"` in contact.html) with a
honeypot field for spam. Submissions appear in the Netlify dashboard under
**Forms → contact**. To get emailed when someone submits: Site configuration →
Forms → Form notifications. Note: the form only works on the live Netlify
URL, not when opening the files locally.

## Placeholders still to fill in

- Email address in `contact.html` (currently `hello@zeogital.example`)
- Consultation booking link and LinkedIn URL in `contact.html`
- Real logo, favicon, and founder photo (see above)
