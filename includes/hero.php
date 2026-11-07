<header class="hero portfolio-container" id="home">
    <div class="hero-profile">
        <div class="profile-photo">
            <img src="assets/images/dave.jpg" alt="Profile photo" onerror="this.style.display='none'">
        </div>

        <div class="hero-text">
            <div class="name-row">
                <h1><?= htmlspecialchars($portfolio['name']) ?></h1>
                <span class="verified-dot" aria-hidden="true">✓</span>
            </div>

            <p class="hero-location">
                <span><?= portfolioIcon('location') ?></span>
                <?= htmlspecialchars($portfolio['location']) ?>
            </p>
            <p class="hero-role"><?= htmlspecialchars($portfolio['role']) ?></p>
            <p class="hero-status"><?= htmlspecialchars($portfolio['status']) ?></p>

            <div class="hero-actions">
                <a class="button dark-button <?= ($portfolio['resume'] && $portfolio['resume'] !== '#') ? '' : 'sample-link' ?>" href="<?= htmlspecialchars($portfolio['resume'] ?: '#') ?>" <?= ($portfolio['resume'] && $portfolio['resume'] !== '#') ? 'target="_blank" rel="noopener"' : '' ?>>
                    <span class="button-icon"><?= portfolioIcon('resume') ?></span>
                    View Resume
                </a>
            </div>
        </div>
    </div>
</header>
