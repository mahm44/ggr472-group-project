// Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFobSIsImEiOiJjbHJiaTVkanowb3lzMndwcnYwN3ZleGJkIn0.6g4SedBzopOipcNKBKj3lg';


const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/mahm/cltrpoijj013901p5fpqob5wf',  // map style 
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 12.5 // starting zoom level
})


//Add search control to map overlay
//Requires plugin as source in HTML body
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: "ca" //Try searching for places inside and outside of canada to test the geocoder
    })
);

//Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add fullscreen option to the map
map.addControl(new mapboxgl.FullscreenControl());


// fetch map data from website 
let restaurantsgeojson;

fetch('https://raw.githubusercontent.com/mahm44/ggr472-group-project/main/data/Restaurants.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response);
        restaurantsgeojson = response;
    })

// store user input point for buffers on click 
let pointgeojson = {
    'type': 'FeatureCollection', 
    'features': []
};


map.on('load', () => {
    // for user input buffers 
    map.addSource('inputgeojson', {
        type: 'geojson',
        data: pointgeojson
    });

    map.addLayer({
        'id': 'input-pt',
        'type': 'circle',
        'source': 'inputgeojson',
        'paint': {
            'circle-radius': 5,
            'circle-color': 'blue'
        }, 
    });

    // data map load 
    map.addSource('restaurants', {
        type: 'geojson', 
        data: restaurantsgeojson
    });
    
    // on inital display, show points w/ color corresponding to their rating 
    map.addLayer({
        'id': 'data-pts',
        'type': 'circle', 
        'source': 'restaurants', 
        'layout': {'visibility': 'none'}
    });

    // add map layers for checkboxes --> default visible, change once checkboxes are toggled 
    map.addLayer({
        'id': 'south-asian',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#02555e', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
        ['==', ['get', 'Cuisine'], 'Indian'],
        ['==', ['get', 'Cuisine'], 'Pakistani'], 
        ['==', ['get', 'Cuisine'], 'Bangladeshi ']],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'east-asian',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#55a69f', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
        ['==', ['get', 'Cuisine'], 'Chinese'],
        ['==', ['get', 'Cuisine'], 'Japanese'], 
        ['==', ['get', 'Cuisine'], 'Korean']],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'mid-east',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#dd9984', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['==', ['get', 'Cuisine'], 'Middle Eastern'],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'carribean',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#966552', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['==', ['get', 'Cuisine'], 'Carribean'],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'southeast-asian',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#e7b24f', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
        ['==', ['get', 'Cuisine'], 'Vietnamese'],
        ['==', ['get', 'Cuisine'], 'Thai'], 
        ['==', ['get', 'Cuisine'], 'Filipino']],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'european',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#7a8b9f', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
        ['==', ['get', 'Cuisine'], 'Greek'],
        ['==', ['get', 'Cuisine'], 'French'], 
        ['==', ['get', 'Cuisine'], 'Italian '],
        ['==', ['get', 'Cuisine'], 'Hungarian'],
        ['==', ['get', 'Cuisine'], 'Portugese']],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'central-american',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#e0db2b', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['==', ['get', 'Cuisine'], 'Mexican '],
        'layout': {'visibility': 'visible'}
    });

    map.addLayer({
        'id': 'religious',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#314691', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['==', ['get', 'Cuisine'], 'Jewish '],
        'layout': {'visibility': 'visible'}
    });

    //sentiment layers 
    map.addLayer({
        'id': 'pos',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#c0e218', 
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['all', 
            ['==', ['get', 'foodRating'], 'Positive'],
            ['==', ['get', 'serviceRating'], 'Positive'], 
            ['==', ['get', 'atmosphereRating'], 'Positive']],
        'layout': {'visibility': 'none'}
    });
// too many positive so doing any for these to get more results 
    map.addLayer({
        'id': 'neg',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#c70039',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
            ['==', ['get', 'foodRating'], 'Negative'],
            ['==', ['get', 'serviceRating'], 'Negative'], 
            ['==', ['get', 'atmosphereRating'], 'Negative']],
        'layout': {'visibility': 'none'}
    });

    map.addLayer({
        'id': 'neu',
        'type': 'circle', 
        'source': 'restaurants', 
        'paint': {
            'circle-radius': 4,
            'circle-color': '#0099e5',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'},
        'filter': ['any', 
            ['==', ['get', 'foodRating'], 'Neutral'],
            ['==', ['get', 'serviceRating'], 'Neutral'], 
            ['==', ['get', 'atmosphereRating'], 'Neutral']],
        'layout': {'visibility': 'none'}
    });


    // hexgrid 
    let bboxgeojson;

    // Turf Envelop Geojson
    let bbox = turf.envelope(restaurantsgeojson);

    bboxgeojson = {
        'type': 'FeatureCollection',
        'features': [bbox]
    };

    // Add Source
    map.addSource('collisons-bbox', {
        type: 'geojson', 
        data: bboxgeojson
    });

    // Add Layer & Make Colour White
    map.addLayer({
        'id': 'bounding-box-fill', 
        'type': 'line', 
        'source': 'collisons-bbox', 
        'paint': {
            'line-color': '#FFFFFF'
        },
        'layout': {'visibility': 'none'}
    });

    let bboxcoords = [bbox.geometry.coordinates[0][0][0], 
        bbox.geometry.coordinates[0][0][1], 
        bbox.geometry.coordinates[0][2][0], 
        bbox.geometry.coordinates[0][2][1]]

    let hexgeojson = turf.hexGrid(bboxcoords, 0.075, {units: 'kilometers'});

    // Add Hexgrid Source
    map.addSource('hexgrid', {
        type: 'geojson', 
        data: hexgeojson
    });


    // Turf Collect
    let pricehex = turf.collect(hexgeojson, restaurantsgeojson, '_id', 'values');

    let maxprice = 0;

    pricehex.features.forEach((feature) => {

    feature.properties.priceRating = feature.properties.values.length;
    if (feature.properties.priceRating > maxprice) {
        // console.log(feature);   

        maxprice = feature.properties.priceRating
        }
    });


    // Add Source
    map.addSource('price-hex', {
        type: 'geojson', 
        data: pricehex
    });

    // Add Layer and Adjust Colour Accordingly using an Expression
    map.addLayer({
        'id': 'pricehex-layer', 
        'type': 'fill', 
        'source': 'price-hex',
        'paint' : {
        'fill-color': [
            // Colours depending on Variable
            'step', ['get', 'priceRating'], '#ffffff',
                1, '#fc4e2a', 
                2, '#e31a1c',
                3, '#bd0026', 
                4, '#800026'
                ],
            'fill-opacity': [
                // opacity
                'step', ['get', 'priceRating'], 0.0,
                    1, 0.5, 
                    2, 0.7,
                    3, 0.7, 
                    4, 0.5
                    ],
        }, 
        'layout': {'visibility': 'none'}
    });
})

// checkbox filters 

const checkboxes = document.querySelectorAll('input[class="form-check-input me-1"]');
console.log(checkboxes)
// HOW TO GET CHECKBOX ID

for (const checkbox of checkboxes) {
    checkbox.addEventListener('change', (e) =>  {
        // console.log(checkbox)
        const layerID = checkbox.parentNode.id;
        const layer = map.getLayer(layerID);
        map.setLayoutProperty(layerID, 'visibility', e.target.checked ? 'visible' : 'none')
    });
}

const sentCheckboxes = document.querySelectorAll('input[class="form-check-input me-2"]');
console.log(sentCheckboxes);

for (const checkbox of sentCheckboxes) { 
    checkbox.addEventListener('change', (e) => {
        // console.log(checkbox)
        const layerID = checkbox.parentNode.id;
        const layer = map.getLayer(layerID);
        map.setLayoutProperty(layerID, 'visibility', e.target.checked ? 'visible' : 'none')
    });
}


// button 
const button = document.getElementById('btn');
let btnStatus = null;

const cuisineLayers = ["south-asian", "east-asian", "mid-east", "carribean", "southeast-asian", 
    "european", "central-american", "religious"]

const sentLayers = ["pos", "neg", "neu"]

const cuisineBoxDisplay = document.getElementById('cuisine-display');
const sentBoxDisplay = document.getElementById('sent-display');

// change checkbox status/visibility on click 
button.addEventListener("click", function () {
    // change to sentiment-price display mode 
    if (btnStatus !== true){
        priceLegend.style.display = 'block';
        sentLegend.style.display = 'block';
        cuisineLegend.style.display = 'none';
        cuisineBoxDisplay.style.display = 'none';
        sentBoxDisplay.style.display = 'block';
        map.setLayoutProperty('pricehex-layer', 'visibility', 'visible')
        for (const layerID of cuisineLayers) {
                const layer = map.getLayer(layerID); // what does this line do 
                map.setLayoutProperty(layerID, 'visibility', 'none')
        }
        for (const layerID of sentLayers) {
            const layer = map.getLayer(layerID);
            map.setLayoutProperty(layerID, 'visibility', 'visible')
        }
        // toggle checkboxes 
        for (const checkbox of checkboxes) {
            checkbox.checked = false;
        }
        for (const checkbox of sentCheckboxes){
            checkbox.checked = true;
        }
        btnStatus = true;
    }
    else{
        // change to cuisine display mode 
        priceLegend.style.display = "none";
        sentLegend.style.display = 'none';
        cuisineLegend.style.display = 'block';
        cuisineBoxDisplay.style.display = 'block';
        sentBoxDisplay.style.display = 'none';
        map.setLayoutProperty('pricehex-layer', 'visibility', 'none') // add btn to toggle visibility of hexgrid 
        for (const layerID of sentLayers) {
            const layer = map.getLayer(layerID);
            map.setLayoutProperty(layerID, 'visibility', 'none')
        }
        for (const layerID of cuisineLayers) {
            const layer = map.getLayer(layerID);
            map.setLayoutProperty(layerID, 'visibility', 'visible')
        }
        for (const checkbox of checkboxes) {
            checkbox.checked = true;
        }
        for (const checkbox of sentCheckboxes){
            checkbox.checked = false;
        }
        btnStatus = false;
    }
    console.log(btnStatus);
});

// legends -- ADD SENTIMENTS LEGEND

const cuisineLegend = document.getElementById('cuisine-legend');

const cuiLegendLabels = [
    'South Asian', 'East Asian', 'Middle Eastern', 'Caribbean', 'Southeast Asian', 
    'European', 'Central American', 'Religious'
];

const cuiLegendColors = [
    '#02555e', '#55a69f', '#dd9984', '#966552', '#e7b24f', '#7a8b9f', '#e0db2b', '#314691'
];

// create labels for legend item 
cuiLegendLabels.forEach((label, i) => {
    const colour = cuiLegendColors[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    cuisineLegend.appendChild(item); //add row to the legend
});

const priceLegend = document.getElementById('expense-legend');
const priceLegendLabels = [
    "", "1", "2", "3", "4"
];
const priceLegendColors = [
    '#ffffff', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'
];

// create labels for legend item 
priceLegendLabels.forEach((label, i) => {
    const colour = priceLegendColors[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    priceLegend.appendChild(item); //add row to the legend
});

const sentLegend = document.getElementById('sent-legend');
const sentLegendLabels = [
    "Positive", "Negative", "Neutral"
];
const sentLegendColors = [
    "#c0e218", "#c70039", "#0099e5"
];

sentLegendLabels.forEach((label, i) => {
    const colour = sentLegendColors[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    sentLegend.appendChild(item); //add row to the legend
});

// mouse clicks 

const mapLayers = ['south-asian', 'east-asian', 'mid-east', 'caribbean', 'southeast-asian', 
'european', 'central-american', 'religious'];

mapLayers.forEach(layer => {
    map.on('mouseenter', layer, () => {
        map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over 
    });
    
    map.on('mouseleave', layer, () => {
        map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves 
    });
    map.on('click', layer, (e) => {
        new mapboxgl.Popup() // upon clicking, declare a popup object 
            .setLngLat(e.lngLat) // method uses coordinates of mouse click to display popup at 
            .setHTML("<b>Restaurant:</b> " + e.features[0].properties.Name + "<br>" + "<b>Food: </b>" + e.features[0].properties.foodRating + "<br>" + "<b>Service: </b> " + e.features[0].properties.serviceRating + "<br>" + "<b>Atmosphere: </b> " + e.features[0].properties.atmosphereRating + "<br>" + "<b>Price: </b>" + e.features[0].properties.priceRating + "<br>" + "<b>Cuisine: </b>" + e.features[0].properties.Cuisine)
            .addTo(map); //Show popup on map
    });
});

// different pop ups for sentiment map layers 
const sentMapLayers = ['pos', 'neg', 'neu'];

sentMapLayers.forEach(layer => {
    map.on('mouseenter', layer, () => {
        map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over 
    });
    
    map.on('mouseleave', layer, () => {
        map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves 
    });
    map.on('click', layer, (e) => {
        new mapboxgl.Popup() // upon clicking, declare a popup object 
            .setLngLat(e.lngLat) // method uses coordinates of mouse click to display popup at 
            .setHTML("<b>Restaurant:</b> " + e.features[0].properties.Name + "<br>" + "<b>Cuisine: </b>" + e.features[0].properties.Cuisine + "<br>" + "<b>Price: </b>" + e.features[0].properties.priceRating)
            .addTo(map); //Show popup on map
    });
});


// create buffers for a location on the map when clicked 
// create button - buffer mode -- disable popups 
// on click, highlight / filter for points in the desired radius (depending on currently displayed layer)
// should differ by filter mode, after filtering re-enable popups (maybe add in crows distance from current pt?)
// disabling buffer mode (need indicator) will restore map to intial filter mode display 


// buffer btn functionality -- ADD VISUAL INDICATOR OF TOGGLE STATUS 
const bufferBtn = document.getElementById('buffer-btn');
let bufferStatus = null; 

map.on('click', (e) => {
    // reset layers + source if a point has been clicked already 
    if (pointgeojson.features.geometry){
        map.setLayoutProperty('input-pt', 'visibility', 'none');
        map.removeLayer('inputpointbuff');
        map.removeSource('buffgeojson');
    }
    if (bufferStatus == true){
        // store clicked point and get coordiantes 
        const clickedpoint = {
            'type': 'Feature', 
            'geometry': {
                'type': 'Point', 
                'coordinates': [e.lngLat.lng, e.lngLat.lat]
            }
        };
    
        pointgeojson.features = clickedpoint;
        map.getSource('inputgeojson').setData(pointgeojson.features);
        console.log(pointgeojson);
        map.setLayoutProperty('input-pt', 'visibility', 'visible');

        
        bufferDisplay = {
            'type': 'FeatureCollection', 
            'features': []
        };
        
        let buffer = turf.buffer(pointgeojson.features, 0.5) // adjust buffer distance here???
        bufferDisplay.features = buffer;
        
        // add source to display buffer 
        map.addSource('buffgeojson', {
            "type": "geojson",
            "data": bufferDisplay.features  // use buffer geojson variable as data source
        })
    
        // Show buffers on map using styling
        map.addLayer({
            "id": "inputpointbuff",
            "type": "fill",
            "source": "buffgeojson",
            "paint": {
                'fill-color': "blue",
                'fill-opacity': 0.5,
                'fill-outline-color': "black"
            }
        });
        let displayText = ""
        // assign buffer text list of restaurants appearing within bugffer and their distances 
        let ptsWithin = turf.pointsWithinPolygon(restaurantsgeojson, bufferDisplay.features);
        console.log(ptsWithin);

        ptsWithin.features.forEach((feature) => {
            // console.log(feature);
            displayText += feature.properties.Name + "<br>";
        });
        let bufferText = displayText;
        console.log(bufferText);
        document.getElementById('buffer-text').innerHTML = bufferText;
    }
});

bufferBtn.addEventListener('click', () => {
    if (bufferStatus !== true){
        bufferStatus = true;
        bufferBtn.style.background = '#add8e6';
        document.getElementById('buffer-popup').style.display = 'block';
    }
    else if (bufferStatus == true){
        // wont work properly unless a point has been chosen first 
        map.setLayoutProperty('input-pt', 'visibility', 'none');
        map.removeLayer('inputpointbuff');
        map.removeSource('buffgeojson');
        pointgeojson.features = []
        bufferStatus = false;
        bufferBtn.style.background = '#fff';
        document.getElementById('buffer-popup').style.display = 'none';
    }
});