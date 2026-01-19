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

            if(document.getElementById("days")) {
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

    let index = 0;
    let autoPlayTimer;
    let slideWidthPercent = 50; 

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
        index++;
        if (index >= slides.length) index = 0;
        updateCarousel();
    }

    function prevSlide() {
        index--;
        if (index < 0) index = slides.length - 1;
        updateCarousel();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    function startTimer() {
        autoPlayTimer = setInterval(nextSlide, 3000);
    }

    function resetTimer() {
        clearInterval(autoPlayTimer);
        startTimer();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            slideWidthPercent = 85;
        } else {
            slideWidthPercent = 50;
        }
        centerOffset = (100 - slideWidthPercent) / 2;
        updateCarousel();
    });

    updateCarousel();
    startTimer();
}