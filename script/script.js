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