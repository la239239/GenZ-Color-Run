// --- contact.js ---
// À inclure uniquement sur contact.html

document.addEventListener('DOMContentLoaded', () => {
    
    // On vérifie si on est sur la page contact
    const subjectSelect = document.getElementById('subject-select');
    const messageArea = document.getElementById('message');
    
    if (subjectSelect) {
        // 1. On récupère les paramètres de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const sujet = urlParams.get('sujet');

        // 2. Si un sujet est détecté
        if (sujet) {
            // On sélectionne la bonne option dans le menu
            subjectSelect.value = sujet;

            // 3. SPÉCIAL partenaire : On pré-remplit le message avec humour
            if (sujet === 'partenaire' && messageArea) {
                const funnyMessage = "Salut la team !\n\nJ'ai très envie de rejoindre l'aventure GenZ.\nQue ce soit pour faire courir mon logo (sans qu'il transpire) ou afficher ma plus belle bâche sur le parcours, je suis chaud !\n\nEnvoyez-moi le dossier de sponsoring qu'on regarde ça ensemble.";
                
                messageArea.value = funnyMessage;

// AJOUT : On force la hauteur à s'ajuster immédiatement au contenu
messageArea.style.height = 'auto'; // Reset
messageArea.style.height = messageArea.scrollHeight + 'px'; // Ajustement

messageArea.focus(); 
messageArea.blur();
            }
        }
        // 4. SPÉCIAL BÉNÉVOLE : Message avec les bons postes
            if (sujet === 'benevole' && messageArea) {
                const benevoleMessage = "Hello ! 👋\n\nJe suis super motivé(e) pour rejoindre la Team GenZ !\n\nJe peux vous aider pour :\n- 🚴 Lièvre (J'ai un vélo électrique)\n- 🎟️ Vente de tickets boissons\n- 🚧 Signaler le parcours\n- 🍺 Tenir le bar / Ravito\n\n(Effacez les lignes inutiles)\n\nDispo le 5 Juillet. À très vite !";
                
                messageArea.value = benevoleMessage;
                
                // Ajustement hauteur automatique pour que tout le texte soit visible
                messageArea.style.height = 'auto'; 
                messageArea.style.height = (messageArea.scrollHeight + 20) + 'px'; 

                messageArea.focus(); 
                messageArea.blur(); 
            }
    }
});