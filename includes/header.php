<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Student portfolio website for projects, skills, education, and contact information.">
    <title><?= htmlspecialchars($portfolio['name']) ?> | Portfolio</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
    <link rel="stylesheet" href="css/style.css?v=responsive-20261107">
</head>
<body>
    <button class="theme-toggle" id="themeToggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode">
        <span class="theme-icon icon-sun"><?= portfolioIcon('sun') ?></span>
        <span class="theme-icon icon-moon"><?= portfolioIcon('moon') ?></span>
    </button>
