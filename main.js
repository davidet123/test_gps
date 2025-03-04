// Incluye Leaflet y leaflet-gpx en tu HTML
// <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.4.0/gpx.min.js"></script>
// <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

// Crear el mapa
const map = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Cargar un archivo GPX (reemplaza 'ruta.gpx' con tu archivo real)
const gpx = new L.GPX('test2.gpx', {
    async: true,
    marker_options: {
        startIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
        endIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
        shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png'
    }
}).on('loaded', function(e) {
    map.fitBounds(e.target.getBounds());
}).addTo(map);

// Capturar la ubicación del usuario en tiempo real
const userMarker = L.marker([0, 0]).addTo(map);

function updateLocation(position) {
    const { latitude, longitude } = position.coords;
    userMarker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude], 15);
}

function errorHandler(error) {
    console.error('Error obteniendo la ubicación:', error.message);
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, errorHandler, {
        enableHighAccuracy: true
    });
} else {
    alert('Tu navegador no soporta GPS');
}

