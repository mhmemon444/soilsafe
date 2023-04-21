let selectedTopBar = "explore";
let selectedIcon = null;
let selectedSoilType = "Calcaric Regosols";
let markers = [];
let markerGroup = null;
let mapLayers = [];

let modalOverlay = document.getElementById('modal-overlay');
let modalConfirm = document.getElementById('modal-confirm');
let modalCancel = document.getElementById('modal-cancel');

var map = L.map('map').setView([24.891834510577908, -77.75870441847708], 9);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', onMapClick);

// var geojson;

// geojson = L.geoJSON(soilTypes, { style: style, onEachFeature: onEachFeature }).addTo(map);

const soilLayer = L.geoJSON(soilTypes, { style: style, onEachFeature: onEachFeature });
const wetLayer = L.geoJSON(WET_PROB, { style: wetStyle, onEachFeature: onEachWetFeature });
const cycloneLayer = L.geoJSON(TROPICAL_CYCLONE_PROB, { style: cycloneStyle, onEachFeature: onEachCycloneFeature })
mapLayers.push(soilLayer);
let mapLayerGroup = L.layerGroup(mapLayers);
mapLayerGroup.addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props, layerType = null) {
    if (layerType === "SOIL") {
        if (selectedTopBar === "explore") {
            this._div.innerHTML = '<h4>The Bahamas - Soil Type Mapping</h4>' + (props ?
                '<div id="metaProps"><b>' + "Dominant Soil Type - " + '</b><br />' + props["DOMSOI"] + ' <i>(' + SOIL_TYPE_MAP[props["DOMSOI"]] + ')</i></div><br />' +
                '<div id="metaProps"><b>' + "Soil Description - " + '</b><br />' + SOIL_DESC_MAP[props["DOMSOI"]] + '</div><br />' +
                '<div id="metaProps"><b>' + '<span><img src="img/warning.png"/> Vulnerabilities - </span>' + '</b><br />' + SOIL_VULN_MAP[props["DOMSOI"]] + '</div><br />'
                : 'Hover over a region');
        } else {
            this._div.innerHTML = '<h4>The Bahamas - Soil Type Mapping</h4>' + (props ?
                '<div id="metaProps"><b>' + "Dominant Soil Type - " + '</b><br />' + props["DOMSOI"] + ' <i>(' + SOIL_TYPE_MAP[props["DOMSOI"]] + ')</i></div><br />' +
                '<div id="metaProps"><b>' + "Soil Conservation Measures - " + '</b><br />' + SOIL_CONSERV_MAP[props["DOMSOI"]] + '</div><br />' +
                '<div id="metaProps"><b>' + "Key - " + '</b><br />' + LEGEND_MAP[props["DOMSOI"]] + '</div><br />'
                : 'Hover over a region');
        }
    } else if (layerType === "WET") {
        this._div.innerHTML = '<h4>The Bahamas - Soil Type Mapping</h4>' + (props ?
            '<div id="metaProps"><b>' + "Above-Average Rainfall Probability (1 week) - " + '</b><br />' + props["prob"] + '%'
            : 'Hover over a region');
    } else if (layerType === "CYCLONE") {
        this._div.innerHTML = '<h4>The Bahamas - Soil Type Mapping</h4>' + (props ?
            '<div id="metaProps"><b>' + "Tropical Cyclone Formation Probability (1 week) - " + '</b><br />' + props["prob"] + '%'
            : 'Hover over a region');
    }
};

info.addTo(map);

function onMapClick(e) {
    if (selectedTopBar === "explore") return;
    if (!selectedIcon) return;
    const iconType = selectedIcon === "terracing" ? terracingIcon
        : selectedIcon === "contour" ? contourIcon
            : selectedIcon === "mulch" ? mulchIcon
                : selectedIcon === "guava" ? guavaIcon
                    : selectedIcon === "soilcovermgmt" ? scmIcon
                        : selectedIcon === "rbz" ? rbzIcon
                            : selectedIcon === "vb" ? vbIcon
                                : null
    // L.marker([e.latlng.lat, e.latlng.lng], { icon: iconType }).addTo(map);
    var newMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: iconType });
    markers.push(newMarker);
    markerGroup = L.layerGroup(markers);
    markerGroup.addTo(map);
}

const topBarClickHandler = (type) => {
    if (type === selectedTopBar) return;

    const diffMap = {
        "explore": "manage",
        "manage": "explore"
    };

    document.getElementById("topbar-opt-" + type).classList.add("selected");
    document.getElementById("topbar-opt-" + diffMap[type]).classList.remove("selected");

    selectedTopBar = type;

    document.getElementById("sidebar").style.visibility = type === "manage" ? "visible" : "hidden";

    const markers = document.getElementsByClassName("leaflet-marker-icon");
    for (var i = 0; i < markers.length; i++) {
        markers[i].style.visibility = type === "manage" ? "visible" : "hidden";
    }
}

const iconClickHandler = (type) => {
    if (type === selectedIcon) {
        document.getElementById(type).classList.remove("icon-selected");
        selectedIcon = null;
        return;
    };
    document.getElementById(type).classList.add("icon-selected");
    selectedIcon && document.getElementById(selectedIcon)?.classList.remove("icon-selected");

    selectedIcon = type;
    console.log("selectedIcon: ", selectedIcon);
}

const updateSidebar = () => {
    const sidebarTitle = document.getElementById("sidebar-title");
    const sidebarContainer = document.getElementById("sidebar-container");
    sidebarTitle.innerHTML = "<div><span><img src='img/soilemoji.png' id='soilemoji'/></span>" + selectedSoilType + "</div>";
    if (selectedSoilType === "Calcaric Regosols") {
        sidebarContainer.innerHTML = `
            <div id="sidebar-row">
                <div class="sidebar-item" id="terracing" onclick="iconClickHandler('terracing')"><img
                    src="img/terracing.png" id="sidebar-item-img" /></div>
                <div class="sidebar-item" id="contour" onclick="iconClickHandler('contour')"><img src="img/ctre.png"
                    id="sidebar-item-img" /></div>
            </div>
            <div id="sidebar-row">
                <div class="sidebar-item" id="mulch" onclick="iconClickHandler('mulch')"><img src="img/mulch.png"
                    id="sidebar-item-img" /></div>
                <div class="sidebar-item" id="guava" onclick="iconClickHandler('guava')"><img src="img/guava.png"
                    id="sidebar-item-img" /></div>
            </div>
            <div style="margin-top: auto;">
                <div class="sidebar-item-importexport" onclick="save()" id="save">💾 SAVE</div>
                <div class="sidebar-item-importexport" id="import" onclick="importMarkers()">📑 IMPORT</div>
            </div>
            <div id="sidebar-row">
                <div class="sidebar-item" id="undo" onclick="undoHandler()"><img src="img/undo.png"
                    id="sidebar-meta-img" /></div>
                    <div class="sidebar-item" id="trash" onclick="showModal()"><img src="img/trash-bin.png"
                        id="sidebar-meta-img" /></div>
            </div>
        `;
    } else if (selectedSoilType === "Eutric Gleysols") {
        sidebarContainer.innerHTML = `
            <div id="sidebar-row">
                <div class="sidebar-item" id="soilcovermgmt" onclick="iconClickHandler('soilcovermgmt')"><img
                    src="img/soilcovermgmt.png" id="sidebar-item-img" /></div>
                <div class="sidebar-item" id="rbz" onclick="iconClickHandler('rbz')"><img src="img/rbz.png"
                    id="sidebar-item-img" /></div>
            </div>
            <div id="sidebar-row">
                <div class="sidebar-item" id="vb" onclick="iconClickHandler('vb')"><img src="img/vb.png"
                    id="sidebar-item-img" /></div>
                
            </div>
            <div style="margin-top: auto;">
                <div class="sidebar-item-importexport" onclick="save()" id="save">💾 SAVE</div>
                <div class="sidebar-item-importexport" id="import" onclick="importMarkers()">📑 IMPORT</div>
            </div>
            <div id="sidebar-row">
                <div class="sidebar-item" id="undo" onclick="undoHandler()"><img src="img/undo.png"
                    id="sidebar-meta-img" /></div>
                    <div class="sidebar-item" id="trash" onclick="showModal()"><img src="img/trash-bin.png"
                        id="sidebar-meta-img" /></div>
            </div>
        `;
    }
    selectedIcon && document.getElementById(selectedIcon).classList.add("icon-selected");
}

const undoHandler = () => {
    // Remove the last marker from the array
    var lastMarker = markers.pop();

    // Remove the LayerGroup from the map
    map.removeLayer(markerGroup);

    // Recreate the LayerGroup with the updated array
    markerGroup = L.layerGroup(markers);

    markerGroup.addTo(map);
}

function showModal() {
    if (markers.length === 0) return;
    modalOverlay.style.display = 'flex';
}

function hideModal() {
    modalOverlay.style.display = 'none';
}

modalConfirm.addEventListener('click', function () {
    deleteHandler();
    hideModal();
});

modalCancel.addEventListener('click', function () {
    hideModal();
});


const deleteHandler = () => {
    map.removeLayer(markerGroup);
    markers = [];
}

function getColor(d) {
    return d == "Rc" ? '#BDB76B' :
        d == "Ge" ? '#6C7B8B' :
            d == "WR" ? 'darkblue' :
                'grey';
}

function getWetColor(prob) {
    return prob == "50" ? '#cbfcc4' :
    prob == "65" ? '#73e077' :
    prob == "80" ? '#57bd57' :
                'grey';
}

function getCycloneColor(prob) {
    return prob == "20" ? '#ffb6b6' :
    prob == "40" ? '#ff4d4d' :
    prob == "60" ? '#9d4d4d' :
                'red';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties["DOMSOI"]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function wetStyle(feature) {
    return {
        fillColor: getWetColor(feature.properties["prob"]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.2
    };
}

function cycloneStyle(feature) {
    return {
        fillColor: getCycloneColor(feature.properties["prob"]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();

    info.update(layer.feature.properties, "SOIL");
}

function highlightWetFeature(e) {
    var layer = e.target;

    layer.setStyle({
        fillOpacity: 0.4
    });

    layer.bringToBack();

    info.update(layer.feature.properties, "WET");
}

function highlightCycloneFeature(e) {
    var layer = e.target;

    layer.setStyle({
        fillOpacity: 0.9
    });

    layer.bringToBack();

    info.update(layer.feature.properties, "CYCLONE");
}

function resetHighlight(e) {
    soilLayer.resetStyle(e.target);

    info.update(null, "SOIL");
}

function resetWetHighlight(e) {
    wetLayer.resetStyle(e.target);

    info.update();
}

function resetCycloneHighlight(e) {
    cycloneLayer.resetStyle(e.target);

    info.update(null, "CYCLONE");
}

function soilClickHandler(e) {
    if (selectedTopBar === "explore") return;

    var layer = e.target;

    const soilCode = layer.feature.properties["DOMSOI"];

    const soilType = SOIL_TYPE_MAP[soilCode];

    selectedSoilType = soilType;

    //update sidebar
    updateSidebar();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: soilClickHandler,
    });
}

function onEachWetFeature(feature, layer) {
    layer.on({
        mouseover: highlightWetFeature,
        mouseout: resetWetHighlight,
        // click: soilClickHandler,
    });
}

function onEachCycloneFeature(feature, layer) {
    layer.on({
        mouseover: highlightCycloneFeature,
        mouseout: resetCycloneHighlight,
        // click: soilClickHandler,
    });
}

var terracingIcon = L.icon({
    iconUrl: 'img/terracing.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var contourIcon = L.icon({
    iconUrl: 'img/ctre.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var mulchIcon = L.icon({
    iconUrl: 'img/mulch.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var guavaIcon = L.icon({
    iconUrl: 'img/guava.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var scmIcon = L.icon({
    iconUrl: 'img/soilcovermgmt.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var rbzIcon = L.icon({
    iconUrl: 'img/rbz.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var vbIcon = L.icon({
    iconUrl: 'img/vb.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// L.marker([25, -77], {icon: terracingIcon}).addTo(map);
