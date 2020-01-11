// Public variables:
var tdtMap;
var arcGISMap;
var zoomLevel = 17;
var arcGISMapDivID = "arcgisDiv";
var tiandituMapDivID = "mapDiv";
// ******************************* Onload ******************************
function initArcGISMap() {
    require(["esri/Map", "esri/views/MapView"], function(Map, MapView) {
      var map = new Map({
        basemap: "satellite"
      });
  
      var view = new MapView({
        container: "arcgisDiv",
        map: map,
        center: [115.716441, 28.197917],
        zoom: zoomLevel
      });
    });
  }

  initArcGISMap();