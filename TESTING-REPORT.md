# EduPath – SEO & Testing Report (9 November 2026)

## Summary
All 32 automated checks passed (32/32). Tested with Playwright (Chromium) on desktop (1280px) and mobile (iPhone 13).

## Fixes and improvements
| # | Task | What was done |
|---|------|---------------|
| 1 | Blog "No articles found" bug | `[hidden]` CSS rule ensures the message only shows when 0 articles match; cards are hidden with the `hidden` attribute; filtering only runs on the blog grid. |
| 2 | Category filters & search | All 5 categories + "All" tested by button and by URL (`?category=`); header search from any page; search + category combined; search box keeps the search word; result count shown; `aria-pressed` on filter buttons. |
| 3 | 3 new articles (total 8) | *Time Management for Students: 8 Practical Strategies* (Study Skills), *How to Prepare for a University Admission Interview* (Admissions), *How to Write a Student CV With Little Experience* (Career Guidance). Added to Blog page and sitemap. |
| 4 | Privacy Policy | Added Cookies, Third-Party Services (GitHub Pages, Cloudflare cdnjs, FormSubmit, external links), data retention, user rights, children's privacy, policy changes and contact sections. |
| 5 | Contact form | Replaced `mailto:` (did not actually send) with FormSubmit POST, honeypot spam field and success message. Newsletter form also sends via FormSubmit. **The first live submission sends a one-time activation email to chandazahra0@gmail.com that must be confirmed.** |
| 6 | sitemap.xml & robots.txt | Sitemap lists all 15 pages with `<lastmod>`; robots.txt allows crawling and links to the sitemap. |
| 7 | SEO & alt text | Unique meta descriptions (50–170 chars) on every page, better homepage description, canonical URLs, Open Graph/Twitter tags, theme colour, SVG favicon. Decorative icons/emojis marked `aria-hidden`; hero illustration given `role="img"` + descriptive label; no `<img>` without alt. |
| 8 | Mobile navigation & links | Menu toggle updates `aria-expanded`, switches ☰/✕, closes on link click, Escape and resize; current page highlighted; no horizontal scroll on mobile. All internal links on all 15 pages checked – 0 broken. |
| – | Colour scheme | CSS variables set to Primary #1E3A8A, Secondary #2563EB, Accent #F59E0B, Background #F8FAFC, Text #1E293B. Layout unchanged. |
| – | Repo hygiene | `.gitignore` added for `.DS_Store`. |

## Test results
| Test | Result |
|------|--------|
| Blog: all 8 articles visible | ✅ Pass |
| Blog: "No articles found" hidden | ✅ Pass |
| Filter study-skills | ✅ Pass |
| Filter scholarships | ✅ Pass |
| Filter admissions | ✅ Pass |
| Filter career-guidance | ✅ Pass |
| Filter exam-prep | ✅ Pass |
| URL ?category=study-skills | ✅ Pass |
| URL ?category=scholarships | ✅ Pass |
| URL ?category=admissions | ✅ Pass |
| URL ?category=career-guidance | ✅ Pass |
| URL ?category=exam-prep | ✅ Pass |
| Search "scholarship" | ✅ Pass |
| Search "CV" | ✅ Pass |
| Search no match shows message | ✅ Pass |
| Search + category combined | ✅ Pass |
| All internal links work (15 pages) | ✅ Pass |
| Every page: meta description, canonical, one H1, alt on images | ✅ Pass |
| sitemap.xml lists all 15 pages | ✅ Pass |
| robots.txt allows crawl + points to sitemap | ✅ Pass |
| Contact form posts to FormSubmit | ✅ Pass |
| Contact form blocks empty submit | ✅ Pass |
| Contact success message | ✅ Pass |
| Privacy Policy: cookies + third-party sections | ✅ Pass |
| Mobile nav index.html | ✅ Pass |
| Mobile no horizontal scroll index.html | ✅ Pass |
| Mobile nav blog.html | ✅ Pass |
| Mobile no horizontal scroll blog.html | ✅ Pass |
| Mobile nav blog/how-to-write-a-student-cv.html | ✅ Pass |
| Mobile no horizontal scroll blog/how-to-write-a-student-cv.html | ✅ Pass |
| Mobile menu link navigates | ✅ Pass |
| No JavaScript errors | ✅ Pass |

## Screenshots
See the `screenshots/` folder: blog with all articles, category filter, search results, no-results message, contact form, contact success, privacy policy, mobile menu, mobile blog.

## Manual checks after deployment
- Submit the contact form once on the live site and confirm the FormSubmit activation email.
- Submit the sitemap in Google Search Console.
