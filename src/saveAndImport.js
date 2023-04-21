const iconTypeMap = {
    "img/terracing.png": terracingIcon,
    "img/ctre.png": contourIcon,
    "img/guava.png": guavaIcon,
    "img/soilcovermgmt.png": scmIcon,
    "img/mulch.png": mulchIcon,
    "img/rbz.png": rbzIcon,
    "img/vb.png": vbIcon
}

function save() {
    const savedMarkers = [];
    // Get all the markers from the layer group
    const markers = markerGroup.getLayers();

    markers.forEach(marker => {
        markerLatLng = marker.getLatLng();
        savedMarkers.push({
            lat: markerLatLng.lat,
            lng: markerLatLng.lng,
            icon: marker.options.icon.options.iconUrl
        })
    });

    jsonString = JSON.stringify(savedMarkers);

    // Create a Blob object from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a URL for the Blob object
    const url = window.URL.createObjectURL(blob);

    // Create a link element to download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const filename = prompt('Enter the file name', 'untitled');
    if (filename) {
        link.download = filename;
        link.click();
    } else {
        // If the user clicked "Cancel", show an alert and reset the input
        alert('No file name entered. The download has been cancelled.');
    }
}

function importMarkers() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';

    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (markerGroup) {
                map.removeLayer(markerGroup);
                markers = [];
            }
            
            const parsedMarkers = JSON.parse(reader.result);
            // Do something with the markers, e.g. add them to a Leaflet layer
            parsedMarkers.forEach(m => {
                var newMarker = L.marker([m.lat, m.lng], { icon: iconTypeMap[m.icon] });
                markers.push(newMarker);
            })

            markerGroup = L.layerGroup(markers);
            markerGroup.addTo(map);
        };

        reader.readAsText(file);
    };

    fileInput.click();


}