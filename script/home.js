// --- home.js ---
// À inclure uniquement sur index.html

// --- 1. COMPTE À REBOURS ---
function startCountdown() {
    const eventDate = new Date("July 5, 2026 10:00:00").getTime();

    // Calcul initial
    const now = new Date().getTime();
    const distance = eventDate - now;

    const targetDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    const targetHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const targetMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const targetSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Fonction d'animation
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            let currentValue = Math.floor(progress * (end - start) + start);

            if (id !== "days" && currentValue < 10) {
                currentValue = "0" + currentValue;
            }

            obj.innerText = currentValue;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Lancement animation
    animateValue("days", 0, targetDays, 2000);
    animateValue("hours", 0, targetHours, 2000);
    animateValue("minutes", 0, targetMinutes, 2000);
    animateValue("seconds", 0, targetSeconds, 2000);

    // Lancement du tic-tac après l'animation
    setTimeout(() => {
        setInterval(() => {
            const nowTick = new Date().getTime();
            const distanceTick = eventDate - nowTick;

            const days = Math.floor(distanceTick / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distanceTick % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distanceTick % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distanceTick % (1000 * 60)) / 1000);

            if (document.getElementById("days")) {
                document.getElementById("days").innerText = days;
                document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
                document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
                document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
            }
        }, 1000);
    }, 2000);
}

// Lancement au chargement
startCountdown();



// --- 2. CARROUSEL ---
const track = document.querySelector('.carousel-track');

// Sécurité : On ne lance le code que si le carrousel existe sur la page
if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const pauseBtn = document.querySelector('.pause-btn'); // <— nouveau

    let index = 0;
    let autoPlayTimer = null;
    let isPaused = false; // <— état pause
    let slideWidthPercent = 50;

    // Respecte le breakpoint défini dans ton CSS (50% desktop / 85% mobile)
    if (window.innerWidth <= 768) {
        slideWidthPercent = 85;
    }
    let centerOffset = (100 - slideWidthPercent) / 2;

    function updateCarousel() {
        const newTranslate = centerOffset - (index * slideWidthPercent);
        track.style.transform = `translateX(${newTranslate}%)`;

        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    // ---- Autoplay / Pause ----
    const AUTOPLAY_DELAY = 3000;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function startTimer() {
        if (prefersReducedMotion || isPaused) return;
        stopTimer(); // sécurité
        autoPlayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
        setPauseUi(false);
    }

    function stopTimer() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
        setPauseUi(true);
    }

    function resetTimer() {
        stopTimer();
        isPaused = false;
        startTimer();
    }

    function togglePause() {
        if (isPaused) {
            isPaused = false;
            startTimer();
        } else {
            isPaused = true;
            stopTimer();
        }
    }

    function setPauseUi(paused) {
        if (!pauseBtn) return;
        pauseBtn.setAttribute('aria-pressed', String(paused));
        pauseBtn.setAttribute('aria-label', paused ? 'Reprendre' : 'Mettre en pause');
        pauseBtn.title = paused ? 'Reprendre' : 'Mettre en pause';
        pauseBtn.textContent = paused ? '▶' : '⏸';
    }

    // ---- Écouteurs ----
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            if (!isPaused) resetTimer(); // remet un cycle si en lecture
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            if (!isPaused) resetTimer();
        });
    }

    // Click sur pause/reprendre
    if (pauseBtn) {
        pauseBtn.addEventListener('click', togglePause);
    }

    // Optionnel : pause au survol, reprise à la sortie SI l’utilisateur n’a pas cliqué pause
    const container = document.querySelector('.carousel-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            if (!prefersReducedMotion && !isPaused) stopTimer();
        });
        container.addEventListener('mouseleave', () => {
            if (!prefersReducedMotion && !isPaused) startTimer();
        });

        // Accessibilité clavier : flèches et espace = pause
        container.setAttribute('tabindex', '0');
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
                if (!isPaused) resetTimer();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                if (!isPaused) resetTimer();
            } else if (e.key === ' ') {
                e.preventDefault();
                togglePause();
            }
        });
    }

    // Resize : recalcule le centrage selon le breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            slideWidthPercent = 85;
        } else {
            slideWidthPercent = 50;
        }
        centerOffset = (100 - slideWidthPercent) / 2;
        updateCarousel();
    });

    // Init
    updateCarousel();
    if (!prefersReducedMotion) {
        startTimer();
    } else {
        isPaused = true;
        setPauseUi(true);
    }
}
