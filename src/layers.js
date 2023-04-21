// Get the three checkboxes and add event listeners to each one
const soilCheckbox = document.getElementById('soil-checkbox');
soilCheckbox.addEventListener('change', handleCheckboxChange);

const rainfallCheckbox = document.getElementById('rainfall-checkbox');
rainfallCheckbox.addEventListener('change', handleCheckboxChange);

const cycloneCheckbox = document.getElementById('cyclone-checkbox');
cycloneCheckbox.addEventListener('change', handleCheckboxChange);

// Define the function to handle checkbox changes
function handleCheckboxChange() {
    // Get the current state of all three checkboxes
    const soilChecked = soilCheckbox.checked;
    const rainfallChecked = rainfallCheckbox.checked;
    const cycloneChecked = cycloneCheckbox.checked;

    mapLayers = [];

    soilChecked && mapLayers.push(soilLayer);
    !soilChecked && mapLayerGroup.removeLayer(soilLayer);

    rainfallChecked && mapLayers.push(wetLayer);
    !rainfallChecked && mapLayerGroup.removeLayer(wetLayer);

    cycloneChecked && mapLayers.push(cycloneLayer);
    !cycloneChecked && mapLayerGroup.removeLayer(cycloneLayer);

    mapLayerGroup = L.layerGroup(mapLayers);
    mapLayerGroup.addTo(map);
}
