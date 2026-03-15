// --- home.js ---
// À inclure uniquement sur index.html

// --- 1. COMPTE À REBOURS ---
function startCountdown() {
    const eventDate = new Date("July 5, 2026 10:00:00").getTime();

    const now = new Date().getTime();
    const distance = eventDate - now;

    const targetDays    = Math.floor(distance / (1000 * 60 * 60 * 24));
    const targetHours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const targetMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const targetSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentValue = Math.floor(progress * (end - start) + start);
            if (id !== "days" && currentValue < 10) currentValue = "0" + currentValue;
            obj.innerText = currentValue;
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    animateValue("days",    0, targetDays,    2000);
    animateValue("hours",   0, targetHours,   2000);
    animateValue("minutes", 0, targetMinutes, 2000);
    animateValue("seconds", 0, targetSeconds, 2000);

    setTimeout(() => {
        setInterval(() => {
            const nowTick      = new Date().getTime();
            const distanceTick = eventDate - nowTick;
            const days    = Math.floor(distanceTick / (1000 * 60 * 60 * 24));
            const hours   = Math.floor((distanceTick % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distanceTick % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distanceTick % (1000 * 60)) / 1000);
            if (document.getElementById("days")) {
                document.getElementById("days").innerText    = days;
                document.getElementById("hours").innerText   = hours   < 10 ? "0" + hours   : hours;
                document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
                document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
            }
        }, 1000);
    }, 2000);
}

startCountdown();


// --- 2. CARROUSEL (logique originale + swipe touch + dots) ---
const track = document.querySelector('.carousel-track');

if (track) {
    const slides   = Array.from(track.children);
    const nextBtn  = document.querySelector('.next-btn');
    const prevBtn  = document.querySelector('.prev-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const container = document.querySelector('.carousel-container');

    let index = 0;
    let autoPlayTimer = null;
    let isPaused = false;
    let slideWidthPercent = window.innerWidth <= 768 ? 88 : 50;
    let centerOffset = (100 - slideWidthPercent) / 2;

    // --- Dots (créés dynamiquement) ---
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'carousel-dots';
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Photo ' + (i + 1));
        dot.addEventListener('click', () => {
            index = i;
            updateCarousel();
            if (!isPaused) resetTimer();
        });
        dotsWrap.appendChild(dot);
    });
    track.closest('.carousel-section').appendChild(dotsWrap);

    function updateDots() {
        dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    }

    // --- Logique originale intacte ---
    function updateCarousel() {
        const newTranslate = centerOffset - (index * slideWidthPercent);
        track.style.transform = `translateX(${newTranslate}%)`;
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        updateDots();
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    const AUTOPLAY_DELAY = 3000;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function startTimer() {
        if (prefersReducedMotion || isPaused) return;
        stopTimer();
        autoPlayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
        setPauseUi(false);
    }

    function stopTimer() {
        if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; }
        setPauseUi(true);
    }

    function resetTimer() {
        stopTimer();
        isPaused = false;
        startTimer();
    }

    function togglePause() {
        if (isPaused) { isPaused = false; startTimer(); }
        else          { isPaused = true;  stopTimer();  }
    }

    function setPauseUi(paused) {
        if (!pauseBtn) return;
        pauseBtn.setAttribute('aria-pressed', String(paused));
        pauseBtn.setAttribute('aria-label', paused ? 'Reprendre' : 'Mettre en pause');
        pauseBtn.title       = paused ? 'Reprendre' : 'Mettre en pause';
        pauseBtn.textContent = paused ? '▶' : '⏸';
    }

    // Boutons nav
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { nextSlide(); if (!isPaused) resetTimer(); });
        prevBtn.addEventListener('click', () => { prevSlide(); if (!isPaused) resetTimer(); });
    }

    if (pauseBtn) pauseBtn.addEventListener('click', togglePause);

    // Hover pause (logique originale)
    if (container) {
        container.addEventListener('mouseenter', () => { if (!prefersReducedMotion && !isPaused) stopTimer(); });
        container.addEventListener('mouseleave', () => { if (!prefersReducedMotion && !isPaused) startTimer(); });

        container.setAttribute('tabindex', '0');
        container.addEventListener('keydown', (e) => {
            if      (e.key === 'ArrowRight') { nextSlide(); if (!isPaused) resetTimer(); }
            else if (e.key === 'ArrowLeft')  { prevSlide(); if (!isPaused) resetTimer(); }
            else if (e.key === ' ')          { e.preventDefault(); togglePause(); }
        });
    }

    // Resize
    window.addEventListener('resize', () => {
        slideWidthPercent = window.innerWidth <= 768 ? 88 : 50;
        centerOffset = (100 - slideWidthPercent) / 2;
        updateCarousel();
    });

    // --- SWIPE TOUCH (ajout) ---
    if (container) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchDeltaX = 0;
        let isHorizontalSwipe = false;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchDeltaX = 0;
            isHorizontalSwipe = false;
            if (!isPaused) stopTimer();
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            const dx = e.touches[0].clientX - touchStartX;
            const dy = e.touches[0].clientY - touchStartY;

            // Déterminer si swipe horizontal au premier mouvement significatif
            if (!isHorizontalSwipe && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
                isHorizontalSwipe = true;
            }

            if (isHorizontalSwipe) {
                touchDeltaX = dx;
                // Feedback visuel : légère traîne pendant le glissement
                const base = centerOffset - (index * slideWidthPercent);
                const drag = (dx / window.innerWidth) * 55;
                track.style.transition = 'none';
                track.style.transform  = `translateX(${base + drag}%)`;
            }
        }, { passive: true });

        container.addEventListener('touchend', () => {
            if (isHorizontalSwipe) {
                if      (touchDeltaX < -50) nextSlide();
                else if (touchDeltaX >  50) prevSlide();
                else    updateCarousel(); // snap back si trop court
                // Remettre la transition CSS
                track.style.transition = '';
            }
            isHorizontalSwipe = false;
            if (!isPaused) startTimer();
        });
    }

    // Init
    updateCarousel();
    if (!prefersReducedMotion) startTimer();
    else { isPaused = true; setPauseUi(true); }
}