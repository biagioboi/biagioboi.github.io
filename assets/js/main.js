/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $nav = $('#nav'),
        $main = $('#main'),
        $navPanelToggle, $navPanel, $navPanelInner;

    // Breakpoints.
    breakpoints({
        default: ['1681px', null],
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    /**
     * Applies parallax scrolling to an element's background image.
     * @return {jQuery} jQuery object.
     */
    $.fn._parallax = function (intensity) {

        var $window = $(window),
            $this = $(this);

        if (this.length == 0 || intensity === 0)
            return $this;

        if (this.length > 1) {

            for (var i = 0; i < this.length; i++)
                $(this[i])._parallax(intensity);

            return $this;

        }

        if (!intensity)
            intensity = 0.25;

        $this.each(function () {

            var $t = $(this),
                $bg = $('<div class="bg"></div>').appendTo($t),
                on, off;

            on = function () {

                $bg
                    .removeClass('fixed')
                    .css('transform', 'matrix(1,0,0,1,0,0)');

                $window
                    .on('scroll._parallax', function () {

                        var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

                        $bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

                    });

            };

            off = function () {

                $bg
                    .addClass('fixed')
                    .css('transform', 'none');

                $window
                    .off('scroll._parallax');

            };

            // Disable parallax on ..
            if (browser.name == 'ie'			// IE
                || browser.name == 'edge'			// Edge
                || window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
                || browser.mobile)					// Mobile devices
                off();

            // Enable everywhere else.
            else {

                breakpoints.on('>large', on);
                breakpoints.on('<=large', off);

            }

        });

        $window
            .off('load._parallax resize._parallax')
            .on('load._parallax resize._parallax', function () {
                $window.trigger('scroll');
            });

        return $(this);

    };

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Scrolly.
    $('.scrolly').scrolly();

    // Background.
    $wrapper._parallax(0.925);

    // Nav Panel.

    // Toggle.
    $navPanelToggle = $(
        '<a href="#navPanel" id="navPanelToggle">Menu</a>'
    )
        .appendTo($wrapper);

    // Change toggle styling once we've scrolled past the header.
    $header.scrollex({
        bottom: '5vh',
        enter: function () {
            $navPanelToggle.removeClass('alt');
        },
        leave: function () {
            $navPanelToggle.addClass('alt');
        }
    });

    // Panel.
    $navPanel = $(
        '<div id="navPanel">' +
        '<nav>' +
        '</nav>' +
        '<a href="#navPanel" class="close"></a>' +
        '</div>'
    )
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'right',
            target: $body,
            visibleClass: 'is-navPanel-visible'
        });

    // Get inner.
    $navPanelInner = $navPanel.children('nav');

    // Move nav content on breakpoint change.
    var $navContent = $nav.children();

    breakpoints.on('>medium', function () {

        // NavPanel -> Nav.
        $navContent.appendTo($nav);

        // Flip icon classes.
        $nav.find('.icons, .icon')
            .removeClass('alt');

    });

    breakpoints.on('<=medium', function () {

        // Nav -> NavPanel.
        $navContent.appendTo($navPanelInner);

        // Flip icon classes.
        $navPanelInner.find('.icons, .icon')
            .addClass('alt');

    });

    // Hack: Disable transitions on WP.
    if (browser.os == 'wp'
        && browser.osVersion < 10)
        $navPanel
            .css('transition', 'none');

    // Intro.
    /*
        var $intro = $('#intro');

        if ($intro.length > 0) {

            // Hack: Fix flex min-height on IE.
                if (browser.name == 'ie') {
                    $window.on('resize.ie-intro-fix', function() {

                        var h = $intro.height();

                        if (h > $window.height())
                            $intro.css('height', 'auto');
                        else
                            $intro.css('height', h);

                    }).trigger('resize.ie-intro-fix');
                }

            // Hide intro on scroll (> small).
                breakpoints.on('>small', function() {

                    $main.unscrollex();

                    $main.scrollex({
                        mode: 'bottom',
                        top: '25vh',
                        bottom: '-50vh',
                        enter: function() {
                            $intro.addClass('hidden');
                        },
                        leave: function() {
                            $intro.removeClass('hidden');
                        }
                    });

                });

            // Hide intro on scroll (<= small).
                breakpoints.on('<=small', function() {

                    $main.unscrollex();

                    $main.scrollex({
                        mode: 'middle',
                        top: '15vh',
                        bottom: '-15vh',
                        enter: function() {
                            $intro.addClass('hidden');
                        },
                        leave: function() {
                            $intro.removeClass('hidden');
                        }
                    });

            });

        }
*/
})(jQuery);

// JavaScript da aggiungere alla fine del tuo file main.js o in un nuovo script
document.addEventListener('DOMContentLoaded', function () {
    // Ottieni gli elementi del carosello
    const slides = document.querySelector('.food-slides');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');

    // Imposta lo stato iniziale
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.food-slide').length;

    // Funzione per aggiornare il carosello
    function updateCarousel() {
        // Aggiorna la posizione delle slide
        slides.style.transform = `translateX(-${currentSlide * 20}%)`;

        // Aggiorna gli indicatori
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // Ascoltatori di eventi per le frecce
    prevBtn.addEventListener('click', function () {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function () {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });

    // Ascoltatori di eventi per gli indicatori
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Avvio rotazione automatica (opzionale)
    let interval = setInterval(function () {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000); // cambia slide ogni 5 secondi

    // Ferma la rotazione automatica quando il mouse è sopra il carosello
    document.querySelector('.food-carousel').addEventListener('mouseenter', function () {
        clearInterval(interval);
    });

    // Riprendi la rotazione automatica quando il mouse lascia il carosello
    document.querySelector('.food-carousel').addEventListener('mouseleave', function () {
        interval = setInterval(function () {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });
});

    /* ===== Helpers ===== */
    function formatMonthShort(d, lang) {
    const s = d.toLocaleString(lang, { month: 'short' });
    return s.charAt(0).toUpperCase() + s.slice(1);
}
    function formatDateLabel(iso) {
    const lang = document.documentElement.lang || 'en';
    const d = new Date(iso + "T00:00:00");
    const dd = String(d.getDate()).padStart(2,'0');
    const mon = formatMonthShort(d, lang);
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd} ${mon} ${yy}`;
}
    function formatTitle(n) {
    return `[${n.type}] ${n.title} — ${n.venue}`;
}

    /* ===== Fetch + render ===== */
    (async () => {
    const url = '/assets/news.json'; // assoluto dalla root del sito
    let data = [];

    try {
    const r = await fetch(url, {
    headers: { 'Accept': 'application/json' }
    // se vuoi evitare cache aggressiva di GitHub Pages:
    //, cache: 'no-store'
});
    if (!r.ok) throw new Error(`HTTP ${r.status} on ${url}`);
    const json = await r.json();        // <-- ritorna davvero il JSON
    if (!Array.isArray(json)) throw new Error('JSON non è un array');
    data = json;
} catch (err) {
    console.error('News fetch failed:', err);
    data = [];
}

    window.BB_NEWS = data; // opzionale, se vuoi leggerlo altrove

    /* ===== Rotazione con transizione ===== */
    const items = Array.isArray(data) ? [...data].sort((a,b)=> new Date(b.date) - new Date(a.date)) : [];
    if (!items.length) return;

    const linkEl = document.getElementById('bb-news-link');
    const textEl = document.getElementById('bb-news-text');
    const dateEl = document.getElementById('bb-news-date');
    if (!linkEl || !textEl || !dateEl) {
    console.warn('Elementi del banner non trovati nel DOM.');
    return;
}

    linkEl.classList.add('bb-anim');

    let i = 0;
    function setContent(idx) {
    const n = items[idx];
    linkEl.href = n.url || "#";
    textEl.textContent = formatTitle(n);
    dateEl.textContent = formatDateLabel(n.date);
}

    setContent(i);

    const INTERVAL_MS = 6000;
    setInterval(() => {
    linkEl.classList.add('is-out');
    const done = () => {
    linkEl.removeEventListener('transitionend', done);
    i = (i + 1) % items.length;
    setContent(i);
    requestAnimationFrame(() => linkEl.classList.remove('is-out'));
};
    linkEl.addEventListener('transitionend', done, { once: true });
    setTimeout(done, 380); // fallback
}, INTERVAL_MS);
})();

/* ===== Helpers ===== */
function formatMonthShort(d, lang) {
    // mese breve con iniziale maiuscola (en/it a seconda della <html lang>)
    const s = d.toLocaleString(lang, {month: 'short'});
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDateLabel(iso) {
    const lang = document.documentElement.lang || 'en';
    const d = new Date(iso + "T00:00:00");
    const dd = String(d.getDate()).padStart(2, '0');
    const mon = formatMonthShort(d, lang);
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd} ${mon} ${yy}`; // es. 07 Sep 25
}

function formatTitle(n) {
    return `[${n.type}] ${n.title} — ${n.venue}`;
}

