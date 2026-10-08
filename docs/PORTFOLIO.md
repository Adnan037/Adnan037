# Adnan Khan's portfolio — maintainer guide

A complete, responsive portfolio for Adnan Khan, connecting professional IT and network security experience with an expanding interest in AI assistants, analytics, and business platforms.

## Preview locally

Requires Node.js 22 or newer. No packages need to be installed.

```sh
npm start
```

Open http://localhost:3000. You can also open `index.html` directly in a browser, keeping `styles.css`, `app.js`, and `assets` beside it.

## Build and deploy

```sh
npm run build
```

The `dist` folder contains the deployable website. Upload it to any static hosting provider. For Vercel, import the repository, select **Other** as the framework, set the build command to `npm run build`, and use `dist` as the output directory. For Netlify, use the same build command and publish directory.

`dist/Adnan_Khan_Portfolio.html` is a portable edition with the font, styles, scripts, and resume embedded. Download it and open it in a browser to view the website without a server. External project and LinkedIn links require internet access.

## Personalize it

- **Profile, experience, projects, and contact:** edit `index.html`.
- **Project overview dialogs:** edit the `projectDetails` object in `app.js`.
- **Colors and layout:** edit `styles.css`. The main colors are variables at the top.
- **Resume:** replace `assets/Adnan_Khan_Resume.pdf`, then rebuild.
- **New project:** duplicate a project card in `index.html`, set its category, add its overview to `app.js`, and update the filter counts and `README.md`.
- **Social sharing:** after choosing a public domain, add its canonical URL, `og:url`, and a hosted `og:image` in `index.html`.

## Included features

- Responsive desktop, tablet, and mobile layouts.
- Accessible navigation, skip link, native modal dialogs, and reduced motion support.
- Project category filters and expandable experience entries.
- Resume download, phone and LinkedIn links, and a copy-email button.
- A contact form that creates a draft in the visitor's email application. It does not send messages or store submissions. The visitor reviews and sends the draft.
- A local Manrope font, basic search metadata, Person structured data, print styles, and an SVG favicon.

## Content and project status

Professional experience, contact details, education, and certifications are based on the uploaded `Adnan_Khan_Resume.pdf`. Unified IT Ops and ALSAAD FRAGRANCES descriptions reflect their project repositories and live Cloudflare URLs as checked on 8 October 2026. Unified IT Ops agent release 0.5.8 and its successful Cloudflare deployment were verified against the release manifest and GitHub Actions. This release includes a dedicated native Windows tray app, automatic desktop updates, repaired Windows uninstall registration, and an in-app uninstall action. Installer repair preserves existing enrollment. The restricted project UI was not inspected through company sign-in. Its Windows desktop controls use installed Defender protection; standalone AV/EDR and equivalent security interfaces on other operating systems remain unfinished. Unified IT Ops requires company sign-in; ALSAAD's payment backend remains inactive until configured. The two AI project directions are portfolio concepts, not completed products or employment experience. Project graphics are original portfolio illustrations, not screenshots or measured outcomes.

Project links should be checked whenever a deployment moves. Never publish company inventory, tenant IDs, credentials, customer orders, or private repository contents in this public portfolio.

The font is distributed under the SIL Open Font License, included in `assets/FONT-LICENSE.txt`.

## Validation

Checked in Chromium at widths of 320, 375, 390, 650, 768, 850, 1024, and 1440 pixels, with no horizontal overflow. Browser checks passed for project filters, dialog focus and Escape handling, experience entries, clipboard copying, email draft generation, the original resume download, and the portable HTML with the browser offline. No JavaScript errors were recorded. Automated axe-core audits reported no WCAG 2 A/AA or WCAG 2.1 AA violations in the desktop, expanded experience, project dialog, and mobile navigation states. Automated audits do not cover every aspect of accessibility.
