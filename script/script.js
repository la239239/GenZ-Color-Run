// --- script.js ---
// À inclure sur toutes les pages

document.addEventListener('DOMContentLoaded', () => {
    
    // --- MENU BURGER MOBILE ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li a");

    if (hamburger && navMenu) {
        // 1. Ouvrir / Fermer le menu au clic sur le burger
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // 2. Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // --- GESTION LIEN ACTIF (Si tu as la fonction setActiveLink) ---
    if (typeof setActiveLink === "function") {
        setActiveLink();
    }
});
// --- MINI COUNTDOWN (pages secondaires) ---
(function() {
    const el = document.getElementById('mini-countdown');
    if (!el) return;

    const eventDate = new Date("July 5, 2026 10:00:00").getTime();

    function pad(n) { return n < 10 ? '0' + n : n; }

    function tick() {
        const now  = new Date().getTime();
        const diff = eventDate - now;
        if (diff <= 0) { el.textContent = "C'est aujourd'hui ! 🎉"; return; }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        el.innerHTML =
            '<span class="mc-item"><span class="mc-val">' + d + '</span><span class="mc-lbl">j</span></span>' +
            '<span class="mc-sep">:</span>' +
            '<span class="mc-item"><span class="mc-val">' + pad(h) + '</span><span class="mc-lbl">h</span></span>' +
            '<span class="mc-sep">:</span>' +
            '<span class="mc-item"><span class="mc-val">' + pad(m) + '</span><span class="mc-lbl">m</span></span>' +
            '<span class="mc-sep">:</span>' +
            '<span class="mc-item"><span class="mc-val">' + pad(s) + '</span><span class="mc-lbl">s</span></span>';
    }

    tick();
    setInterval(tick, 1000);
})();