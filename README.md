# Udhaya Builders — Premium Website Prototype

A premium, fully static marketing site for **Udhaya Builders**, built to be hosted free on **GitHub Pages**. No build step, no server, no database.

- Cinematic hero slider with Ken Burns zoom and an animated preloader
- Scroll animations powered by GSAP: split-text headings, image curtain reveals, parallax, counters, and a process timeline that draws as you scroll
- Project portfolio with category filters and a lightbox (keyboard, swipe, prev/next)
- HD images served responsively (`srcset`): small files on phones, up to 2880px on retina laptops
- Responsive on mobile, tablet and laptop/desktop, with a full-screen animated mobile menu
- Contact form that opens WhatsApp with the enquiry pre-filled, plus a floating WhatsApp button
- Respects the "reduce motion" accessibility setting, and stays usable if JavaScript or the CDN fails

## Edit the content

Everything a non-developer needs to change is in **`js/data.js`**:

| What | Where in `data.js` |
|---|---|
| Phone, WhatsApp, email, address, hours | top of `window.SITE` |
| Founding year (drives "18+ years") | `since` |
| Stats band numbers | `stats` |
| Services (title, text, image) | `services` |
| Projects (title, category, location, area, year, status, image) | `projects` |
| Client testimonials | `testimonials` |

> ⚠️ The phone number, email, address, project details and testimonials are **sample placeholders** — replace them with real ones before going live.

### Using your own photos
Images currently come from Unsplash (free HD stock photos). To use real project photos:
1. Put them in `assets/images/` (JPG/WebP, ~2000px wide is ideal).
2. In `data.js` set e.g. `img: 'assets/images/aaranya-villa.jpg'`.

Hero, About, Why-us and CTA photos are set directly in `index.html` (search for `images.unsplash.com`).

## Preview locally

Any static server works, for example:

```bash
npx serve .
```

Or simply open `index.html` in a browser.

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `udhaya-builders-premium`).
2. Push this folder:
   ```bash
   git init
   git add .
   git commit -m "Premium website prototype"
   git branch -M main
   git remote add origin https://github.com/<your-username>/udhaya-builders-premium.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. After about a minute the site is live at `https://<your-username>.github.io/udhaya-builders-premium/`.

To use a custom domain (e.g. `www.udhayabuilders.com`), add it under **Settings → Pages → Custom domain** and point a `CNAME` DNS record to `<your-username>.github.io`.

## Structure

```
index.html        page markup
css/style.css     design system, layout & responsive rules
js/data.js        ALL editable content
js/main.js        rendering, interactions & animations
assets/           favicon (and your own images)
.nojekyll         tells GitHub Pages to serve files as-is
```
