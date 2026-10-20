# Focal Point Homes: Practice Rebuild

A static, hand-coded rebuild of [focalpointhomes.com](https://focalpointhomes.com/), a custom and semi-custom home builder in McLean, VA. I made it as a practice project to work on layout, animation, accessibility and plain JavaScript without any framework.

> **Not the official site.** This project is not affiliated with Focal Point Homes. The company name, logo, photos, videos, text and PDFs belong to Focal Point Homes and are used here only for practice and as a portfolio sample. The original site is at https://focalpointhomes.com/.

**Live demo:** [focal-point-homes.netlify.app](https://focal-point-homes.netlify.app/)

## Tech

- HTML5, CSS3, vanilla JavaScript
- No Bootstrap, jQuery, Swiper or any other library
- No build step, no package manager
- Fonts are self-hosted: Cormorant Garamond (300, 500) and DM Sans (400, 500)

## Pages (12)

| Page | File |
| --- | --- |
| Home | `index.html` |
| Custom homes | `custom.html` |
| Semi-custom homes | `semi-custom.html` |
| Quick delivery homes | `quick-delivery.html` |
| Meet the team | `meet-the-team.html` |
| Customer reviews | `customer-reviews.html` |
| Customer care | `customer-care.html` |
| Contact | `contact.html` |
| Blog + 3 posts | `blog.html`, `blog-podcast.html`, `blog-vacation.html`, `blog-champions.html` |

## What I changed compared to the original

The original is a WordPress site. This version is rebuilt from scratch as plain files. The sections below list what is different or new.

### Design and structure

- Rebuilt as static HTML, CSS and JS. No WordPress, no plugins, no tracking scripts.
- New look: navy and cyan palette, Cormorant Garamond headings, DM Sans body text, rounded corners, soft shadows.
- **Dark and light theme.** A toggle in the header switches themes. The choice is saved in `localStorage`, and the first visit follows the system setting. A small inline script sets the theme before the page paints, so there is no white flash.
- Full-screen menu with a `clip-path` reveal and staggered link animation. It closes with the `Esc` key, locks page scroll while open, and moves keyboard focus in and out.
- Sticky header that gets a shadow after you scroll.
- Home types shown as an asymmetric bento grid.
- CSS is split into a shared base (`style.css`), shared sub-page styles (`pages.css`) and one small file per page.
- Responsive breakpoints at 1200px, 992px, 768px, 576px and 320px.

### Home page

- Hero background video stays fixed while the hero box works as a window over it, using `position: fixed` and `clip-path`. The review section uses the same trick with its own video. The "Want to build, but need a lot?" and team sections use a fixed background image (`background-attachment: fixed`), so the section scrolls over the photo.
- Videos play only while visible (`IntersectionObserver`), which saves battery and data.
- Photo gallery with two marquee rows moving in opposite directions. The rows are built by `js/main.js`, so the HTML stays short. They pause on hover and focus, and stop moving for people who prefer reduced motion.
- Photo lightbox built on the native `<dialog>` element: previous and next buttons, arrow keys, wrap-around, and click outside to close.
- Intro video: the Vimeo player loads only after clicking "Play intro video", and the iframe is removed on close so the sound stops.
- Open houses are marked as past automatically from a `data-date` attribute. If nothing is upcoming, the title changes to "Recent open houses" and a call prompt appears.
- Newsletter form with email and consent checks (demo, no backend).
- Footer year updates by itself.

### Sub pages

- **Custom and Semi-custom:** hero photos cross-fade every 5 seconds and drift on scroll (parallax). If the online photos fail, the local image shows instead. Below the hero, a photo slider with thumbnails, previous/next buttons, arrow keys, touch swipe and a photo counter.
- **Semi-custom:** new sort control for the 12 plans (price, size, name). Plans without a size listed always go last when sorting by size. The original shows a static list.
- **Quick delivery:** new filter for all, available or under contract, with a live home count. The original shows the status as plain text only.
- **Meet the team:** each bio opens in a native `<details>` element, and only one stays open at a time. If a photo fails to load, the person's initials show instead.
- **Customer reviews:** Google reviews plus video stories that open in a modal. Vimeo loads only on click.
- **Customer care:** new live search over the 19 PDF maintenance guides, with an empty-state message. The client portal section links out to the CoConstruct portal instead of copying its login form.
- **Contact and "Let's talk" sections:** inquiry form with required-field checks, optional email checked only when filled, and `aria-invalid` on the first problem field (demo, no backend).
- **Blog:** "Load more articles" button that reveals 10 posts at a time. All posts stay visible if JavaScript is off. Three posts are rebuilt locally. The rest link to the original site.

### Performance

- Photos are served as WebP with `width` and `height` set to avoid layout shift, and `loading="lazy"` below the fold.
- Main heading font is preloaded and all fonts use `font-display: swap`.
- Heavy embeds (Vimeo) load only when needed.
- Page scripts are small and separate: `main.js` for the home page, `common.js` shared by every other page, plus one short file per feature.

### Accessibility

- Skip-to-content link, semantic landmarks, `aria-current` on the active page, `aria-expanded` on the menu button.
- Visible `:focus-visible` outlines on links, buttons and inputs.
- Alt text on content images, `aria-label` on icon buttons, `role="status"` on form messages.
- `prefers-reduced-motion` is respected for the gallery, hero text and card animations.
- Everything important works with the keyboard: menu, lightbox, sliders and forms.

## Known limits

- Forms are demo only. Nothing is sent anywhere.
- The content is a snapshot (listings, plans, prices, open house) and will not update with the real site.
- Some images and all PDFs load directly from `focalpointhomes.com`: the hero slideshow photos on Custom and Semi-custom, the team photos, the quick delivery photos and the customer care guides. If the original site moves or removes them, those images will break. Fallbacks exist for the hero photos and team photos.
- Vimeo videos need an internet connection.

## Run locally

No install needed.

1. Clone the repo.
2. Open `index.html` in a browser.

Or serve it from a local server:

```bash
python3 -m http.server 5501
```

Then open http://localhost:5501. With VS Code Live Server, the port is already set to 5501 in `.vscode/settings.json`.

## Project structure

```
focal-point-homes-modern/
├── index.html
├── custom.html
├── semi-custom.html
├── quick-delivery.html
├── meet-the-team.html
├── customer-reviews.html
├── customer-care.html
├── contact.html
├── blog.html
├── blog-podcast.html
├── blog-vacation.html
├── blog-champions.html
├── css/
│   ├── style.css            base: fonts, colors, header, menu, home page, footer, lightbox
│   ├── pages.css            shared parts of all sub pages
│   └── <page>.css           one small file per sub page
├── js/
│   ├── main.js              home page: theme, menu, gallery, lightbox, open houses, videos
│   ├── common.js            sub pages: theme, menu, newsletter, inquiry form
│   ├── hero-slider.js       cross-fade and parallax hero
│   ├── slider.js            photo slider
│   └── <page>.js            sort, filter, search, load more, modals, accordion
├── images/                  WebP photos, logo, icon
├── fonts/                   self-hosted WOFF2 files
└── video/                   hero.mp4, review.mp4
```

## Author

Made by Aqib as a practice project. Original website, content and brand: [Focal Point Homes](https://focalpointhomes.com/).
