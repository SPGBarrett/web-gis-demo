// Flag for insert or edit:
var flagForInsertOrEdit = 0; // 0=insert, 1=edit
// Public settings:
var messageboxDuration = 1500;
var usPopZoomThreshold = 5;
var autoPlayDataInterval = 500;
var intervalInstance = null;
var mapStyleHashMap = {
    0: 'mapbox://styles/mapbox/streets-v11',
    1: 'mapbox://styles/mapbox/light-v10',
    2: 'mapbox://styles/mapbox/dark-v10',
    3: 'mapbox://styles/mapbox/outdoors-v11',
    4: 'mapbox://styles/mapbox/satellite-v9'
}

var dataSourceHashMap = {
    0: 'mapbox://styles/mapbox/streets-v11',
    1: 'mapbox://styles/mapbox/light-v10',
    2: 'mapbox://styles/mapbox/dark-v10',
    3: 'mapbox://styles/mapbox/outdoors-v11',
    4: 'mapbox://styles/mapbox/satellite-v9'
}

var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];


// Define Vue object for index.html
var indexVue = new Vue({
    el: '#app',
    data: function () {
        return {
            // Variables:
            drawerShow: false, //Drawer menu show
            direction: 'ltr', //From left to right
            formLabelWidth: '100px',
            selectedMapTheme: 2,
            selectedDemoType: 0,
            selectedBaseMap: 0,
            editDefaultLayers: false,
            selectedDataSource: '../static/china-node-poi.geojson',
            formData: {},
            layerOpacity: 100,
            showPopStateLegend: false,
            showPopCountyLegend: false,
            showEarthquakeControl: true,
            playBtnIcon: "el-icon-video-play",
            sliderValue: 0,
            displayMonth: months[0],
            baseMapList: [{
                    value: 0,
                    label: 'MapBox'
                },
                {
                    value: 1,
                    label: 'ArcGIS API for JS'
                }
            ],
            mapStyleList: [{
                    value: 0,
                    label: 'Street Map'
                },
                {
                    value: 1,
                    label: 'Light Theme Map'
                },
                {
                    value: 2,
                    label: 'Dark Theme Map'
                },
                {
                    value: 3,
                    label: 'Outdoors Map'
                },
                {
                    value: 4,
                    label: 'Satellite Imagery Map'
                }
            ],
            demoTypeList: [{
                    value: 0,
                    label: 'Basic Map Demo'
                },
                {
                    value: 1,
                    label: 'Mapbox Clustering'
                },
                {
                    value: 2,
                    label: 'Leaflet Clustering'
                },
                {
                    value: 3,
                    label: 'Location Big Data'
                },
                {
                    value: 4,
                    label: 'Trajectory Big Data with Echarts'
                },
                {
                    value: 5,
                    label: 'US States with Population Density'
                },
                {
                    value: 6,
                    label: 'Realtime Location Stream'
                },
                {
                    value: 7,
                    label: 'Spatiotemporal Earthquake Data'
                },
                {
                    value: 8,
                    label: 'SmartSite Demo'
                },
                {
                    value: 9,
                    label: 'Reserved Place 2'
                }
            ],
            dataSourceList: [{
                    value: '../static/china-node-poi.geojson',
                    label: 'China POI Data'
                },
                {
                    value: '../static/fengchengtest.geojson',
                    label: 'Shanghai POI Data'
                },
                {
                    value: '../static/fengchengtest.geojson',
                    label: 'India Ethics Data'
                },
                {
                    value: '../static/fengchengtest.geojson',
                    label: 'Earthquake Data'
                },
                {
                    value: '../static/fengchengtest.geojson',
                    label: 'FengCheng Test Data'
                }
            ],
            customLayerList: [] // All custom layers
        }
    },
    methods: {
        //**********************************All control binded or related methods: ******************************* */
        handleClose(done) {
            done();
            //Pop out confrimation dialog:
            // this.$confirm('确认关闭？')
            //   .then(_ => {
            //     done();
            //   })
            //   .catch(_ => {});
        },
        testBtnClick: function () {
            //alert(mapStyleHashMap['3']);
            //map.setStyle(mapStyleHashMap[this.selectedMapType]);
            //loadGeoJsonAndCenter();
            //loadPOIBigDataFromGeoJson();
            //getAllCustomlLayers();
            refreshAndInitMap();
        },
        jumpTo: function (index) {
            switch (index) {
                case 1:
                    window.open('/mapbox-test.html');
                    break;
                case 2:
                    break;
                default:
                    break;
            }

        },
        refreshLayers: function () {
            getAllCustomlLayers();
        },
        loadClusterDataBtnClick: function () {
            // Load all cluster data:
            loadBigDataWithCluster();
        },
        locationDataClick: function () {
            removeAllLayers();
            loadPOIBigDataFromGeoJson();
        },
        //**********OnChange ********* */
        onSelectedMapChange: function () {
            //alert(this.selectedMapType);
            map.setStyle(mapStyleHashMap[this.selectedMapTheme]);
        },
        onSelectedBaseMapChange: function () {

        },
        onSelectedDemoChange: function () {
            // Reset some variables；
            this.showPopStateLegend = false;
            this.showPopCountyLegend = false;
            this.showEarthquakeControl = false;
            // Refresh layers:
            getAllCustomlLayers();
            switch (this.selectedDemoType) {
                case 1:
                    break;
                case 5: //US State Population
                    // Show legend according to zoom level:
                    if (map.getZoom() > usPopZoomThreshold) {
                        this.showPopStateLegend = false;
                        this.showPopCountyLegend = true;
                    } else {
                        this.showPopStateLegend = true;
                        this.showPopCountyLegend = false;
                    }
                    // Remove current custom layers；
                    removeAllLayers();
                    // Load data:
                    loadUSStateData();
                    break;
                case 7: // Earthquake data:
                    // Clear all layers:
                    removeAllLayers();
                    // Show controls:
                    this.showEarthquakeControl = true;
                    // Load data:
                    loadEarthQuakeData();

                    break;
                default:
                    break;
            }
        },
        onDataSourceSelectChange: function () {

        },
        onLayerEditSwitchChange: function () {
            // traverse layer list:
            for (let index in this.customLayerList) {
                if (this.customLayerList[index].source == 'composite') {
                    if (this.editDefaultLayers == false) {
                        this.customLayerList[index].disabled = true;
                    } else {
                        this.customLayerList[index].disabled = false;
                    }
                }
            }
        },
        layerCheckChange: function (layerID, layerVisibility) { // Layer visibility, Called when checkbox changed
            if (layerVisibility == true) {
                map.setLayoutProperty(layerID, 'visibility', 'visible');
            } else {
                map.setLayoutProperty(layerID, 'visibility', 'none');
            }
        },
        earthquakeAutoplay: function () { // Auto play earthquake data:
            this.sliderValue = 0;
            if (this.playBtnIcon == "el-icon-video-play") {
                // Set button:
                this.playBtnIcon = "el-icon-video-pause";
                // Start interval:
                intervalInstance = setInterval(() => {
                    filterBy(this.sliderValue);
                    this.sliderValue++;
                    if (this.sliderValue >= 12) this.sliderValue = 0;
                }, autoPlayDataInterval);
            } else {
                this.playBtnIcon = "el-icon-video-play";
                if (intervalInstance != null) {
                    clearInterval(intervalInstance);
                }
                filterBy(this.sliderValue);
            }
        }
    },
    //*********************************************Life cycles: ****************************************/
    mounted() {

    },
    //********************************************Watch methods: ***********************************/
    watch: {

    },

});



//*****************************************Factory Functions *****************************/
function loadGeoJsonAndCenter() {
    // Add source:
    map.addSource('test-test', {
        type: 'geojson',
        //data: 'http://127.0.0.1:5501/static/fengchengtest.geojson'
        data: '../static/fengchengtest.geojson'
    });
    // Add layer:
    map.addLayer({
        'id': 'test-json',
        'type': 'circle',
        'source': 'test-test',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
    });
    map.addLayer({
        'id': 'test-json-line',
        'type': 'line',
        'source': 'test-test',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 3
        },
        'filter': ['==', '$type', 'LineString']
    });
    map.addLayer({
        'id': 'test-json-polygon',
        'type': 'fill',
        'source': 'test-test',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        },
        'filter': ['==', '$type', 'Polygon']
    });
    // Center map:
    map.flyTo({
        center: [115.719970, 28.197359]
    });
}

function loadPOIBigDataFromGeoJson() {
    // Add source:
    // Check if the source exist；
    if (!map.isSourceLoaded('china-poi')) {
        map.addSource('china-poi', {
            type: 'geojson',
            //data: 'http://127.0.0.1:5501/static/fengchengtest.geojson'
            data: '../static/china-node-poi.geojson',
        });
    }
    // Add point layer:
    map.addLayer({
        'id': 'poi-bd-point',
        'type': 'circle',
        'source': 'china-poi',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': 2.5,
            'circle-color': '#4bb1ff',
            'circle-opacity': 0.5,
        },
        'filter': ['==', '$type', 'Point'],
    });
    // Add line layer:
    map.addLayer({
        'id': 'poi-bd-line',
        'type': 'line',
        'source': 'china-poi',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'visible'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 3
        },
        'filter': ['==', '$type', 'LineString']
    });
    // Add polygon layer:
    map.addLayer({
        'id': 'poi-bd-polygon',
        'type': 'fill',
        'source': 'china-poi',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        },
        'filter': ['==', '$type', 'Polygon']
    });
    // Add heat map layer:
    map.addLayer({
            'id': 'poi-heat',
            'type': 'heatmap',
            'source': 'china-poi',
            'maxzoom': 9,
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'mag'],
                    0,
                    0,
                    6,
                    1
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                'heatmap-intensity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    1,
                    9,
                    3
                ],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                // 'heatmap-color': [
                //     'interpolate',
                //     ['linear'],
                //     ['heatmap-density'],
                //     0,
                //     'rgba(33,102,172,0)',
                //     0.2,
                //     'rgb(103,169,207)',
                //     0.4,
                //     'rgb(209,229,240)',
                //     0.6,
                //     'rgb(253,219,199)',
                //     0.8,
                //     'rgb(239,138,98)',
                //     1,
                //     'rgb(178,24,43)'
                // ],
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0,
                    'rgba(33,102,172,0)',
                    0.15,
                    'rgb(255,243,175)',
                    0.4,
                    'rgb(254,167,71)',
                    0.6,
                    'rgb(252,89,45)',
                    0.8,
                    'rgb(165,0,38)',
                    1,
                    'rgb(129,0,38)'
                ],
                // Adjust the heatmap radius by zoom level, if too dense, minize the params
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    1,
                    9,
                    5,
                    18,
                    10
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    1,
                    9,
                    0.5,
                    18,
                    0
                ]
            }
        },
        'waterway-label'
    );
    // Add heat map point:
    map.addLayer({
            'id': 'earthquakes-point',
            'type': 'circle',
            'source': 'china-poi',
            'minzoom': 7,
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                // Size circle radius by earthquake magnitude and zoom level
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    ['interpolate', ['linear'],
                        ['get', 'mag'], 1, 1, 6, 4
                    ],
                    16,
                    ['interpolate', ['linear'],
                        ['get', 'mag'], 1, 5, 6, 50
                    ]
                ],
                // Color circle by earthquake magnitude
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'mag'],
                    1,
                    'rgba(33,102,172,0)',
                    2,
                    'rgb(103,169,207)',
                    3,
                    'rgb(209,229,240)',
                    4,
                    'rgb(253,219,199)',
                    5,
                    'rgb(239,138,98)',
                    6,
                    'rgb(178,24,43)'
                ],
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                // Transition from heatmap to circle layer by zoom level
                'circle-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    0,
                    8,
                    1
                ]
            }
        },
        'waterway-label'
    );
    // Center and zoom map:
    map.setZoom(5);
    map.flyTo({
        //center: [115.719970, 28.197359] // Shanghai
        center: [106.105957, 32.231390] // Center of China
    });
}

//Cluster By big data:
function loadBigDataWithCluster() {
    // Add source:
    // Check if the source exist；
    if (!map.isSourceLoaded('china-poi')) {
        map.addSource('china-poi', {
            type: 'geojson',
            //data: 'http://127.0.0.1:5501/static/fengchengtest.geojson'
            data: '../static/china-node-poi.geojson',
            // Enable Cluster:
            cluster: true,
            // Cluster settings:
            clusterMaxZoom: 19, // Max zoom to cluster points on
            clusterRadius: 70 // Radius of each cluster when clustering points (defaults to 50)
        });
    }
    // Add cluster layer
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'china-poi',
        filter: ['has', 'point_count'],
        'layout': {
            'visibility': 'visible',
        },
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            // 'circle-color': [
            //     'step',
            //     ['get', 'point_count'],
            //     '#51bbd6',
            //     100,
            //     '#f1f075',
            //     750,
            //     '#f28cb1'
            // ],
            // 'circle-radius': [
            //     'step',
            //     ['get', 'point_count'],
            //     20,
            //     100,
            //     30,
            //     750,
            //     40
            // ]
            // Customized color setting with more steps:
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#69c363',
                50,
                '#a5dee5',
                100,
                '#75cce8',
                750,
                '#eabebf',
                2000,
                '#f7db70',
                6500,
                '#d6a3dc',
                8000,
                '#d54646'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                10,
                50,
                15,
                100,
                20,
                750,
                25,
                2000,
                30,
                6500,
                40
            ]
        }
    });
    // Add point count label:
    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'china-poi',
        filter: ['has', 'point_count'],
        layout: {
            'visibility': 'visible',
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });
    // Add layer for original points:
    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'china-poi',
        filter: ['!', ['has', 'point_count']],
        'layout': {
            'visibility': 'visible',
        },
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('china-poi').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });
    // Set mouse cursor style
    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });
    // Set zoom level
    map.setZoom(6);
}

// Get all current custom layers:
function getAllCustomlLayers() {
    // Clear current layer list:
    indexVue.customLayerList = [];
    // Reset layer editable switch:
    indexVue.editDefaultLayers = false;
    var layers = map.getStyle().layers;
    for (var i = 0; i < layers.length; i++) {
        //console.log(layers[i]);
        var vis = false; // visibility
        var dis = true; // disable checkbox, true = not editable, false=editable
        if (layers[i].source == 'composite') {
            var vis = true; // visibility
            var dis = true; // disable checkbox, true = not editable, false=editable
        } else {
            if (layers[i].layout == undefined || layers[i].layout == null || layers[i].layout.visibility == undefined || layers[i].layout.visibility == null) {
                vis = true;
                dis = true;
            } else {
                dis = false;
                if (layers[i].layout.visibility == 'visible') {
                    vis = true;
                } else {
                    vis = false;
                }
            }
        }
        // Create an object to store required data for V-FOR:
        var layerObj = {
            id: layers[i].id,
            source: layers[i].source,
            visibility: vis,
            type: layers[i].type,
            disabled: dis
        };
        indexVue.customLayerList.push(layerObj);
    }
    //console.log(indexVue.customLayerList);
}

//Clear all layers and init map:
function refreshAndInitMap() {
    // Remove all added layer:
    removeAllLayers();
    // Remove all source:
    removeAllSources();
}

// Remove all layers:
function removeAllLayers() {
    var layers = map.getStyle().layers;
    for (var i = 0; i < layers.length; i++) {
        var vis = false; // visibility
        var dis = true; // disable checkbox, true = not editable, false=editable
        if (layers[i].source != 'composite' && layers[i].type != 'background') {
            map.removeLayer(layers[i].id);
        }
    }
}
// Remove all sources:
function removeAllSources() {

}

//load US states data；
function loadUSStateData() {
    // Center map and set zoom:
    map.setCenter([-98, 38.88]);
    map.setZoom(3);
    if (!map.isSourceLoaded('us-state-population')) {
        map.addSource('us-state-population', {
            'type': 'vector',
            'url': 'mapbox://mapbox.660ui7x6'
        });
    }
    // Add state layer:
    map.addLayer({
            'id': 'state-population',
            'source': 'us-state-population',
            'source-layer': 'state_county_population_2014_cen',
            'maxzoom': usPopZoomThreshold,
            'type': 'fill',
            'filter': ['==', 'isState', true],
            'paint': {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'population'],
                    0,
                    '#F2F12D',
                    500000,
                    '#EED322',
                    750000,
                    '#E6B71E',
                    1000000,
                    '#DA9C20',
                    2500000,
                    '#CA8323',
                    5000000,
                    '#B86B25',
                    7500000,
                    '#A25626',
                    10000000,
                    '#8B4225',
                    25000000,
                    '#723122'
                ],
                'fill-opacity': 0.75
            }
        },
        'waterway-label'
    );
    // Add contry layer:
    map.addLayer({
            'id': 'county-population',
            'source': 'us-state-population',
            'source-layer': 'state_county_population_2014_cen',
            'minzoom': usPopZoomThreshold,
            'type': 'fill',
            'filter': ['==', 'isCounty', true],
            'paint': {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'population'],
                    0,
                    '#F2F12D',
                    100,
                    '#EED322',
                    1000,
                    '#E6B71E',
                    5000,
                    '#DA9C20',
                    10000,
                    '#CA8323',
                    50000,
                    '#B86B25',
                    100000,
                    '#A25626',
                    500000,
                    '#8B4225',
                    1000000,
                    '#723122'
                ],
                'fill-opacity': 0.75
            }
        },
        'waterway-label'
    );
    // Set map zoom event listener:
    map.on('zoom', function () {
        if (indexVue.selectedDemoType == 5) {
            if (map.getZoom() > usPopZoomThreshold) {
                indexVue.showPopStateLegend = false;
                indexVue.showPopCountyLegend = true;
            } else {
                indexVue.showPopStateLegend = true;
                indexVue.showPopCountyLegend = false;
            }
        }
    });
}
// Create map legend for US state data:
function createMapLegend() {

}

// Load spatiotemporal earthquake data:
function filterBy(month) {
    var filters = ['==', 'month', month];
    map.setFilter('earthquake-circles', filters);
    map.setFilter('earthquake-labels', filters);
    // Set the label to the month
    indexVue.displayMonth = months[month];
}


function loadEarthQuakeData() {
    // Center map and set zoom:
    map.setCenter([31.4606, 20.7927]);
    map.setZoom(0.5);
    // Load geojson:
    d3.json(
        'https://docs.mapbox.com/mapbox-gl-js/assets/significant-earthquakes-2015.geojson',
        function (err, data) {
            if (err) throw err;

            // Create a month property value based on time
            // used to filter against.
            data.features = data.features.map(function (d) {
                d.properties.month = new Date(d.properties.time).getMonth();
                return d;
            });

            map.addSource('earthquakes', {
                'type': 'geojson',
                data: data
            });

            map.addLayer({
                'id': 'earthquake-circles',
                'type': 'circle',
                'source': 'earthquakes',
                'paint': {
                    'circle-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'mag'],
                        6,
                        '#FCA107',
                        8,
                        '#7F3121'
                    ],
                    'circle-opacity': 0.75,
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'mag'],
                        6,
                        20,
                        8,
                        40
                    ]
                }
            });

            map.addLayer({
                'id': 'earthquake-labels',
                'type': 'symbol',
                'source': 'earthquakes',
                'layout': {
                    'text-field': [
                        'concat',
                        ['to-string', ['get', 'mag']],
                        'm'
                    ],
                    'text-font': [
                        'Open Sans Bold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-size': 12
                },
                'paint': {
                    'text-color': 'rgba(0,0,0,0.5)'
                }
            });

            // Set filter to first month of the year
            // 0 = January
            filterBy(0);
            // Set event listeners:
            document
                .getElementById('slider')
                .addEventListener('input', function (e) {
                    var month = parseInt(e.target.value, 10);
                    filterBy(month);
                });
        }
    );
}