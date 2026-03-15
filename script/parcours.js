function loadMap(containerId, gpxPath, color) {
    const map = L.map(containerId, {
        zoomControl: true,
        scrollWheelZoom: true
    });

    // CartoDB Voyager - non bloqué par AdBlock, open source, esthétique propre
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd'
    }).addTo(map);

    const gpxLayer = new L.GPX(gpxPath, {
        async: true,
        polyline_options: { color, weight: 4, opacity: 0.9 },
        marker_options: {
            startIconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            endIconUrl:   'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl:    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
        }
    });

    gpxLayer.on("loaded", e => {
        map.fitBounds(e.target.getBounds());
    });

    gpxLayer.addTo(map);
}

window.addEventListener("DOMContentLoaded", () => {
    loadMap("map-5km",  "assets/GenZColorRun-5KM.gpx",  "#ff007f");
    loadMap("map-10km", "assets/GenZColorRun-10KM.gpx", "#00d2ff");
});