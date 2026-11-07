// Simple JavaScript for theme, animations, skill popups, contact modal and Web3Forms.

document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const contactModal = document.getElementById('contactModal');
    const contactBackdrop = document.getElementById('contactBackdrop');
    const closeContact = document.getElementById('closeContact');
    const openButtons = document.querySelectorAll('[data-open-contact]');
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const year = document.getElementById('currentYear');
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillTooltip = document.getElementById('skillTooltip');
    const skillTooltipIcon = document.getElementById('skillTooltipIcon');
    const skillTooltipName = document.getElementById('skillTooltipName');
    const skillTooltipLevel = document.getElementById('skillTooltipLevel');
    const skillTooltipDescription = document.getElementById('skillTooltipDescription');
    const previewTriggers = document.querySelectorAll('#certifications .preview-trigger');
    const previewModal = document.getElementById('previewModal');
    const previewBackdrop = document.getElementById('previewBackdrop');
    const closePreview = document.getElementById('closePreview');
    const previewModalType = document.getElementById('previewModalType');
    const previewModalTitle = document.getElementById('previewModalTitle');
    const previewModalDescription = document.getElementById('previewModalDescription');
    const previewModalImage = document.getElementById('previewModalImage');
    let activeSkillTag = null;
    let previewReturnFocus = null;
    const sampleLinks = document.querySelectorAll('a[href="#"]');

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Simple scroll reveal animation for each main section.
    const revealItems = document.querySelectorAll('.portfolio-container > section');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(function (item) {
            item.classList.add('reveal');
            observer.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add('show');
        });
    }

    // Theme toggle.
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }

    // Keeps the button label in sync with the current mode.
    function updateThemeLabel() {
        if (!themeToggle) return;
        const label = body.classList.contains('dark') ? 'Switch to light mode' : 'Switch to dark mode';
        themeToggle.setAttribute('aria-label', label);
        themeToggle.setAttribute('title', label);
    }
    updateThemeLabel();

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark');
            localStorage.setItem(
                'portfolio-theme',
                body.classList.contains('dark') ? 'dark' : 'light'
            );
            updateThemeLabel();
        });
    }

    // Skill details: hover on desktop, tap on mobile/tablet.
    function levelClass(level) {
        return String(level || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    function positionSkillTooltip(tag) {
        if (!skillTooltip || !tag) return;

        const gap = 10;
        const edge = 12;
        const tagRect = tag.getBoundingClientRect();
        const tipRect = skillTooltip.getBoundingClientRect();

        const spaceAbove = tagRect.top - edge;
        const spaceBelow = window.innerHeight - tagRect.bottom - edge;
        const placement = (spaceAbove >= tipRect.height + gap || spaceAbove > spaceBelow)
            ? 'top'
            : 'bottom';

        let top = placement === 'top'
            ? tagRect.top - tipRect.height - gap
            : tagRect.bottom + gap;

        let left = tagRect.left + (tagRect.width / 2) - (tipRect.width / 2);
        left = Math.max(edge, Math.min(left, window.innerWidth - tipRect.width - edge));
        top = Math.max(edge, Math.min(top, window.innerHeight - tipRect.height - edge));

        skillTooltip.style.top = Math.round(top) + 'px';
        skillTooltip.style.left = Math.round(left) + 'px';
        skillTooltip.dataset.placement = placement;

        const arrow = skillTooltip.querySelector('.skill-tooltip-arrow');
        if (arrow) {
            const tagCenter = tagRect.left + (tagRect.width / 2);
            const arrowLeft = Math.max(14, Math.min(tagCenter - left - 4.5, tipRect.width - 23));
            arrow.style.left = Math.round(arrowLeft) + 'px';
        }
    }

    function showSkillTooltip(tag) {
        if (!skillTooltip || !tag) return;

        skillTags.forEach(function (item) {
            if (item !== tag) {
                item.classList.remove('active');
                item.setAttribute('aria-expanded', 'false');
            }
        });

        const iconTemplate = tag.querySelector('.skill-icon-template');
        skillTooltipIcon.innerHTML = iconTemplate ? iconTemplate.innerHTML : '';
        skillTooltipName.textContent = tag.dataset.skillName || '';
        skillTooltipDescription.textContent = tag.dataset.skillDescription || '';
        skillTooltipLevel.textContent = tag.dataset.skillLevel || '';
        skillTooltipLevel.className = 'skill-level ' + levelClass(tag.dataset.skillLevel);

        tag.classList.add('active');
        tag.setAttribute('aria-expanded', 'true');
        activeSkillTag = tag;

        skillTooltip.setAttribute('aria-hidden', 'false');
        positionSkillTooltip(tag);
        skillTooltip.classList.add('show');
    }

    function hideSkillTooltip(tag) {
        if (!skillTooltip) return;
        if (tag && activeSkillTag && tag !== activeSkillTag) return;

        skillTooltip.classList.remove('show');
        skillTooltip.setAttribute('aria-hidden', 'true');

        if (activeSkillTag) {
            activeSkillTag.classList.remove('active');
            activeSkillTag.setAttribute('aria-expanded', 'false');
        }

        activeSkillTag = null;
    }

    skillTags.forEach(function (tag) {
        tag.addEventListener('mouseenter', function () {
            if (window.matchMedia('(hover: hover)').matches) {
                showSkillTooltip(tag);
            }
        });

        tag.addEventListener('mouseleave', function () {
            if (window.matchMedia('(hover: hover)').matches) {
                hideSkillTooltip(tag);
            }
        });

        tag.addEventListener('focus', function () {
            if (window.matchMedia('(hover: hover)').matches) {
                showSkillTooltip(tag);
            }
        });

        tag.addEventListener('blur', function () {
            if (window.matchMedia('(hover: hover)').matches) {
                hideSkillTooltip(tag);
            }
        });

        tag.addEventListener('click', function (event) {
            if (window.matchMedia('(hover: hover)').matches) return;

            event.stopPropagation();
            const isOpen = activeSkillTag === tag && skillTooltip.classList.contains('show');

            if (isOpen) {
                hideSkillTooltip(tag);
            } else {
                showSkillTooltip(tag);
            }
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.skill-tag')) {
            hideSkillTooltip();
        }
    });

    window.addEventListener('resize', function () {
        if (activeSkillTag) positionSkillTooltip(activeSkillTag);
    });

    window.addEventListener('scroll', function () {
        if (activeSkillTag) positionSkillTooltip(activeSkillTag);
    }, { passive: true });

    // Recent Projects carousel: arrow buttons, touch swipe and keyboard arrows.
    const projectCarousel = document.getElementById('projectCarousel');
    const projectPrev = document.getElementById('projectPrev');
    const projectNext = document.getElementById('projectNext');

    if (projectCarousel && projectPrev && projectNext) {
        function updateProjectArrows() {
            const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
            projectPrev.disabled = projectCarousel.scrollLeft <= 2;
            projectNext.disabled = projectCarousel.scrollLeft >= maxScroll - 2;
        }

        function moveProjects(direction) {
            const card = projectCarousel.querySelector('.project-card');
            if (!card) return;

            const gap = parseFloat(getComputedStyle(projectCarousel).gap) || 0;
            const distance = card.getBoundingClientRect().width + gap;
            // On desktop, move 2 cards together. On mobile, move 1 card.
            const count = window.matchMedia('(max-width: 520px)').matches ? 1 : 2;
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
            const nextPosition = Math.max(0, Math.min(projectCarousel.scrollLeft + direction * distance * count, maxScroll));
            projectCarousel.scrollTo({
                left: nextPosition,
                behavior: reducedMotion ? 'instant' : 'smooth'
            });
        }

        projectPrev.addEventListener('click', function () { moveProjects(-1); });
        projectNext.addEventListener('click', function () { moveProjects(1); });

        projectCarousel.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                moveProjects(event.key === 'ArrowRight' ? 1 : -1);
            }
        });

        projectCarousel.addEventListener('scroll', updateProjectArrows, { passive: true });
        window.addEventListener('resize', updateProjectArrows);
        updateProjectArrows();
    }

    // Cycle each project's own screenshots on its card (no click-to-open modal).
    // The carousel arrows still navigate between project cards as before.
    const slideShows = document.querySelectorAll('#projects .project-slideshow');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    slideShows.forEach(function (slideShow) {
        const slides = Array.from(slideShow.querySelectorAll('.project-slide'));
        if (slides.length < 2) return;

        let active = slides.findIndex(function (slide) {
            return slide.classList.contains('is-active');
        });
        if (active < 0) {
            active = 0;
            slides[0].classList.add('is-active');
        }
        let timer = null;

        function startSlideshow() {
            if (timer !== null || reducedMotion.matches) return;
            timer = window.setInterval(function () {
                if (document.hidden) return;
                slides[active].classList.remove('is-active');
                active = (active + 1) % slides.length;
                slides[active].classList.add('is-active');
            }, 3600);
        }

        function stopSlideshow() {
            if (timer === null) return;
            window.clearInterval(timer);
            timer = null;
        }

        reducedMotion.addEventListener('change', function () {
            if (reducedMotion.matches) stopSlideshow();
            else startSlideshow();
        });
        startSlideshow();
    });

    // Only certifications open the existing borderless, X-free image preview.
    function openPreview(trigger) {
        if (!previewModal || !previewBackdrop || !trigger) return;

        previewReturnFocus = trigger;
        previewModal.classList.add('certificate-preview');
        document.body.classList.add('certificate-preview-open');
        previewModalType.textContent = 'Certificate';
        previewModalTitle.textContent = trigger.dataset.previewTitle || 'Certificate';
        previewModalDescription.textContent = trigger.dataset.previewDescription || '';
        previewModalImage.src = trigger.dataset.previewImage || '';
        previewModalImage.alt = (trigger.dataset.previewTitle || 'Certificate') + ' image';

        previewBackdrop.hidden = false;
        requestAnimationFrame(function () {
            previewBackdrop.classList.add('show');
            previewModal.classList.add('open');
        });
        previewModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('preview-open');
        previewModal.setAttribute('tabindex', '-1');
        previewModal.focus({ preventScroll: true });
    }

    function closePreviewModal() {
        if (!previewModal || !previewBackdrop) return;

        previewModal.classList.remove('open');
        previewBackdrop.classList.remove('show');
        previewModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('preview-open');
        document.body.classList.remove('certificate-preview-open');

        window.setTimeout(function () {
            previewBackdrop.hidden = true;
            if (previewModalImage) previewModalImage.src = '';
        }, 200);

        if (previewReturnFocus) {
            previewReturnFocus.focus();
            previewReturnFocus = null;
        }
    }

    previewTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            openPreview(trigger);
        });
    });

    if (closePreview) closePreview.addEventListener('click', closePreviewModal);
    if (previewBackdrop) previewBackdrop.addEventListener('click', closePreviewModal);

    // Prevent sample # links from jumping to the top while you are still editing them.
    sampleLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            if (!link.hasAttribute('data-open-contact')) {
                event.preventDefault();
            }
        });
    });

    function openModal() {
        if (!contactModal || !contactBackdrop) return;
        contactModal.classList.add('open');
        contactModal.setAttribute('aria-hidden', 'false');
        contactBackdrop.hidden = false;
    }

    function closeModal() {
        if (!contactModal || !contactBackdrop) return;
        contactModal.classList.remove('open');
        contactModal.setAttribute('aria-hidden', 'true');
        contactBackdrop.hidden = true;
    }

    openButtons.forEach(function (button) {
        button.addEventListener('click', openModal);
    });

    if (closeContact) closeContact.addEventListener('click', closeModal);
    if (contactBackdrop) contactBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
            closePreviewModal();
            hideSkillTooltip();
        }
    });

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const accessKeyInput = form.querySelector('[name="access_key"]');
            const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

            if (!accessKey) {
                formStatus.textContent = 'Add your Web3Forms access key first.';
                return;
            }

            formStatus.textContent = 'Sending...';

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    formStatus.textContent = 'Message sent successfully.';
                    form.reset();
                } else {
                    formStatus.textContent = result.message || 'Unable to send message.';
                }
            } catch (error) {
                formStatus.textContent = 'Something went wrong. Please try again.';
            }
        });
    }
});
