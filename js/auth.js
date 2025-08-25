// auth.js
document.addEventListener('DOMContentLoaded', () => {
    // Créez le conteneur pour le pop-up et l'overlay
    const consentOverlay = document.createElement('div');
    consentOverlay.className = 'consent-overlay';
    consentOverlay.innerHTML = `
        <div class="consent-popup">
            <h2>Ce site demande votre autorisation</h2>
            <p>Ce site contient une ambiance sonore. Acceptez-vous de la jouer?</p>
            <div class="consent-buttons">
                <button class="consent-btn accept-btn">Accepter</button>
                <button class="consent-btn refuse-btn">Refuser</button>
            </div>
        </div>
    `;

    document.body.appendChild(consentOverlay);

    // Sélectionnez les boutons, l'élément audio et le contenu de la page
    const pageContent = document.getElementById('page-content');
    const acceptButton = consentOverlay.querySelector('.accept-btn');
    const refuseButton = consentOverlay.querySelector('.refuse-btn');
    // Le chemin vers votre fichier audio
    const audioFilePath = 'audio/test.mp3';
    const backgroundAudio = new Audio(audioFilePath);
    backgroundAudio.volume = 0; // Commence avec un volume de 0
    let intervalId = null;

    // Fonction pour le fondu entrant (fade-in)
    function fadeIn() {
        let volume = 0;
        const fadeInterval = setInterval(() => {
            if (volume < 1) {
                volume += 0.05; // Augmente le volume
                if (volume > 1) volume = 1; // S'assure que le volume ne dépasse pas 1
                backgroundAudio.volume = volume;
            } else {
                clearInterval(fadeInterval);
            }
        }, 100); // Règle la vitesse du fondu
    }

    // Fonction pour le fondu sortant (fade-out) et le redémarrage
    function fadeOutAndRestart() {
        let volume = backgroundAudio.volume;
        const fadeInterval = setInterval(() => {
            if (volume > 0) {
                volume -= 0.05; // Diminue le volume
                if (volume < 0) volume = 0; // S'assure que le volume ne soit pas négatif
                backgroundAudio.volume = volume;
            } else {
                clearInterval(fadeInterval);
                backgroundAudio.currentTime = 0; // Rejoue depuis le début
                backgroundAudio.play().then(fadeIn); // Rejoue et lance le fade-in
            }
        }, 100); // Règle la vitesse du fondu
    }

    // Fonction pour cacher l'overlay avec un effet de transition et afficher le contenu
    function hideOverlayAndShowContent() {
        // Applique les classes CSS de fondu et de flou à l'overlay
        consentOverlay.classList.add('fade-out');
        consentOverlay.classList.add('blur-out');

        // Attend la fin de la transition pour masquer l'élément complètement
        consentOverlay.addEventListener('transitionend', () => {
            consentOverlay.classList.add('hidden');
            // Affiche le contenu de la page après la disparition de l'overlay
            pageContent.classList.remove('hidden-content');
            pageContent.classList.add('visible-content');
        }, {
            once: true
        });
    }

    // Gère le clic sur le bouton "Accepter"
    acceptButton.addEventListener('click', () => {
        hideOverlayAndShowContent();
        // Joue l'audio et lance le fondu entrant
        backgroundAudio.play().then(() => {
            fadeIn();

            // Surveille le temps restant pour relancer l'audio
            intervalId = setInterval(() => {
                const timeRemaining = backgroundAudio.duration - backgroundAudio.currentTime;
                if (timeRemaining < 5) { // Si moins de 5 secondes restantes
                    fadeOutAndRestart();
                }
            }, 1000); // Vérifie toutes les secondes
        });
    });

    // Gère le clic sur le bouton "Refuser"
    refuseButton.addEventListener('click', () => {
        hideOverlayAndShowContent();
    });

    // Nettoyage de l'intervalle si la page est quittée
    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });
});
