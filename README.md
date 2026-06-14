# RiseUp Consulting — Website

Marketing website for RiseUp Consulting LLC (credit counseling and business management consulting, Scranton, PA).

## Structure

```
index.html          Home
services.html        Services
how-it-works.html    How It Works
about.html           About
contact.html         Contact (Formspree form)
privacy.html         Privacy Policy
terms.html           Terms of Service
assets/
  styles.css         Shared styles
  main.js            Drawer nav, language toggle, form handling
  logo.png           Logo
```

## Features

- Responsive layout with left rail nav (desktop) and slide-out drawer (mobile/desktop)
- English / Spanish language toggle (persisted via localStorage)
- Contact form wired to Formspree
- All consultation CTAs link to Calendly

## Deploying

This is a static site — no build step required. Host the contents of this folder on any static host (GitHub Pages, Netlify, Vercel, etc.) and point your domain at it. For GitHub Pages, enable Pages on the repo and set the source to the root of the `main` branch.
