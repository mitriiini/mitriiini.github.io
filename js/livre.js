// Attente que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
    // Le code de gestion du curseur personnalisé a été retiré,
    // car le curseur par défaut est maintenant utilisé.

    // --- Initialisation du Canvas ---
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Fonction pour redimensionner le canvas pour qu'il remplisse la fenêtre
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Ici, vous ajouteriez le code pour redessiner le contenu du canvas
        // si vous aviez des animations ou des graphiques spécifiques.
        // Pour l'instant, nous le laissons vide car il n'y a pas de shader JS fourni.
    };

    // Appeler la fonction de redimensionnement au chargement et lors du redimensionnement de la fenêtre
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Appel initial pour définir la bonne taille

    // Note: Le code pour l'effet visuel du canvas (shader) n'est pas inclus ici car il est souvent
    // très complexe et dépend de bibliothèques spécifiques (comme Three.js ou des implémentations WebGL directes).
    // Le canvas est présent pour la structure visuelle que vous avez fournie.
});