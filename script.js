// --- COMPTE À REBOURS ---
const targetDate = new Date("July 5, 2026 10:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = `
        <div>${days}j</div>
        <div>${hours}h</div>
        <div>${minutes}m</div>
    `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- CARROUSEL AUTO ---
const slides = document.querySelector('.slides');
let index = 0;

function nextSlide() {
    index++;
    if (index > 2) index = 0; // On revient à la première image (3 images au total)
    slides.style.transform = `translateX(${-index * 100}%)`;
}

setInterval(nextSlide, 3000); // Change toutes les 3 secondes