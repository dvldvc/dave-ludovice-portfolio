<div class="contact-backdrop" id="contactBackdrop" hidden></div>

<aside class="contact-modal" id="contactModal" aria-hidden="true" aria-label="Contact form">
    <div class="modal-head">
        <div class="modal-person">
            <div class="modal-avatar">
                <img src="assets/images/dave.jpg" alt="" onerror="this.style.display='none'">
            </div>
            <div>
                <strong><?= htmlspecialchars($portfolio['name']) ?></strong>
                <small>Online</small>
            </div>
        </div>
        <button id="closeContact" class="icon-button" type="button" aria-label="Close contact form"><?= portfolioIcon('close') ?></button>
    </div>

    <div class="modal-intro">
        <p>Hi! Thanks for visiting my portfolio. You can send your message using the form below.</p>
    </div>

    <form id="contactForm" action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value="<?= htmlspecialchars($web3formsKey) ?>">
        <input type="hidden" name="subject" value="Portfolio Contact Message">
        <input type="hidden" name="from_name" value="Portfolio Website">
        <input type="checkbox" name="botcheck" class="hidden-field" tabindex="-1" autocomplete="off">

        <label>
            <span>Name</span>
            <input type="text" name="name" placeholder="Your name" required autocomplete="name">
        </label>

        <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="yourname@email.com" required autocomplete="email" inputmode="email" pattern="[^@\s]+@[^@\s]+\.[A-Za-z]{2,}" title="Enter a complete email address (e.g. name@gmail.com)">
        </label>

        <label>
            <span>Message</span>
            <textarea name="message" rows="4" placeholder="Write your message here..." required></textarea>
        </label>

        <button class="send-button" type="submit">
            <span><?= portfolioIcon('mail') ?></span>
            Send Message
        </button>
        <p class="form-status" id="formStatus" aria-live="polite"></p>
    </form>
</aside>

<!-- Decorative moving label beside the stationary, clickable chat button. -->
<div class="floating-contact-group">
    <span class="floating-email-label" aria-hidden="true">Send Email</span>
    <button class="floating-contact" type="button" data-open-contact aria-label="Send Email - open contact form">
        <?= portfolioIcon('message') ?>
    </button>
</div>
