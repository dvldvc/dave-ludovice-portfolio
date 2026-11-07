# Dave Ludovice Portfolio

Responsive personal portfolio with four featured projects, five Cisco certificates, and a volleyball gallery.

## Import the website

1. Use **Add file → Upload files** in this GitHub repository.
2. Upload `PORTFOLIO-VERCEL-READY-HTML-AND-PHP(1).zip` (or the similarly named Vercel-ready ZIP provided in ChatGPT) **as one ZIP**, without renaming it.
3. Commit the upload to the **main** branch.
4. The **Import portfolio from ZIP** GitHub Action unpacks `student-portfolio/` into this repository and removes the uploaded ZIP. See **Actions** for the result.

## Deploy on Vercel

- Framework Preset: **Other**
- Root Directory: **./**
- Build Command: **none**
- Output Directory: **public**

Vercel serves `public/index.html`; `index.php` is retained for PHP local development and is not executed by the static Vercel deployment.

If changing PHP content, regenerate the static HTML before redeploying. The HTML version contains the public-facing UI.
