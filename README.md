# WorldNexora Corporate Website

Static website — no build step, no dependencies. Upload the folder to any
static host (Netlify, Cloudflare Pages, GitHub Pages, Vercel…).

## Updating content (no redesign needed)

Almost everything a team member needs to change lives in
**`js/site-config.js`**:

| What | Where |
|---|---|
| Nearloom status ("In Development", "Beta"…) | `nearloom.status` |
| Expected launch date | `nearloom.expectedLaunch` |
| Nearloom website URL (enables "Visit Nearloom" buttons) | `nearloom.websiteUrl` |
| Contact email | `contactEmail` |
| Social media links (icons appear only when a URL is set) | `social.*` |
| Contact form endpoint | `formEndpoint` |

Page text (company story, product descriptions, legal pages) is plain HTML in
the page files — search for the paragraph and edit it.

## Contact form

The form validates client-side and POSTs to `formEndpoint`
(Formspree-compatible). Until an endpoint is configured, submissions show the
failure message and nothing is sent. To go live:

1. Create a form at formspree.io pointing at the official WorldNexora inbox.
2. Paste the endpoint URL into `formEndpoint` in `js/site-config.js`.

Spam protection: honeypot field + minimum-fill-time check, plus whatever the
endpoint provider adds.

## Pages

`index.html` · `about.html` · `products.html` · `contact.html`
`privacy.html` · `terms.html` · `cookies.html` · `404.html`
plus `sitemap.xml` and `robots.txt` (update the domain if it changes).

Most hosts serve `404.html` automatically for unknown URLs; on Netlify no
extra config is needed.
