// --- faq.js ---
// À inclure uniquement sur faq.html

document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            // On récupère le parent (.faq-item)
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // 1. Gestion de l'ouverture/fermeture
            // Si c'est déjà ouvert, on ferme
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                // (Optionnel) Fermer les autres questions pour n'en avoir qu'une ouverte à la fois
                // document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                //     activeItem.classList.remove('active');
                //     activeItem.querySelector('.faq-answer').style.maxHeight = null;
                // });

                // On ouvre celle-ci
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px"; // Hauteur auto
            }
        });
    });
});