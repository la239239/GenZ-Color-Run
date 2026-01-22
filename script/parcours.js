function loadMap(containerId, gpxPath, color) {
    const map = L.map(containerId, {
        // ACTIVATION des boutons + et -
        zoomControl: true, 
        // Activation du zoom avec la molette de la souris
        scrollWheelZoom: true 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const gpxLayer = new L.GPX(gpxPath, {
        async: true,
        polyline_options: { color, weight: 4, opacity: 0.9 },
        marker_options: {
            // Icône de Départ (CDN Leaflet)
            startIconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            // Icône d'Arrivée (on utilise la même pour éviter les erreurs)
            endIconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            // Ombre des icônes
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
        }
    });

    gpxLayer.on("loaded", e => {
        map.fitBounds(e.target.getBounds());
    });

    gpxLayer.addTo(map);
}

// Charger les deux cartes
window.addEventListener("DOMContentLoaded", () => {
    loadMap("map-5km", "assets/GenZColorRun-5KM.gpx", "#ff007f");
    loadMap("map-10km", "assets/GenZColorRun-10KM.gpx", "#00d2ff");
});