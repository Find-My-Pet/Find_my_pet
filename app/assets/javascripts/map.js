const info =
`<div id = content>
  <div id = "photo" style="float: left">
    <img src="https://www.dogstrust.org.uk/sponsor/_dogs/digby-assets/v800_digby01.jpg" alt="dog" height="160" width="120">
  </div>            
  <div id="pet-info" style="float: right; padding: 1em;">
    <h2>Dog Name</h2>
    <h5>Type</h5>
    <p>lost on: 1990-01-01<p>
    <p></p>
  </div>

</div>`;

var mapstyle = [
{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"hue":"#ff0000"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"weight":"0.90"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ababab"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"weight":"0.30"},{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#ff0000"},{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#838383"},{"visibility":"on"}]}
]

$( document ).ready(function() {
  var styledMap = new google.maps.StyledMapType(mapstyle, {name: "styled map"});
  var map; // define the global map
  map = initMap();
  map.mapTypes.set("map_style", styledMap);
  map.setMapTypeId("map_style");
  addMarker({lat: -25.363, lng: 131.044}, map, "This is a test title");
  addInfoWindow({lat: -25.363, lng: 140.044}, map, info, 'parking')
});

function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  map = new google.maps.Map(document.getElementById('map'), {
   zoom: 4,
   center: uluru
  });
  
  google.maps.event.addListener(map, 'click', function(event) {
    closeAllInfoWindows();
    addMarker(event.latLng, map);
  });
  
  return map;
}

var markers = [];
var infoWindows = [];


// coords in the form: {lat:123.4141, lng: 30.321}
// map is current map
// info in the form: {`<div>abc</div>...`}
function addInfoWindow(coords, map, info, type){
// init icons, should be defiend outside of add info window block
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var icons = {
  parking: {
    icon: iconBase + 'parking_lot_maps.png'
  },
  library: {
    icon: iconBase + 'library_maps.png'
  },
  info: {
    icon: iconBase + 'info-i_maps.png'
  }
};

  // Creae a infor window on the map with given coords       
  var infowindow = new google.maps.InfoWindow({
    content: info,
    position: coords
  });
  // add info window to the inforWindows array
	infoWindows.push(infowindow); 
  // Leave a marker at the same location
  var marker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: icons[type].icon
  });
  
  // Click on marker will pop up info
  marker.addListener('click', function() {
    closeAllInfoWindows();
    infowindow.open(map, marker);
  });
}



function addMarker(location, map, label) {
  var marker = new google.maps.Marker({
    position: location,
    label: label,
    map: map
  });
  markers.push(marker);
// markers[markers.length - 1] is the location we want to submit on the form        
// console.log(markers[markers.length - 1]);
  if (markers.length > 1) {
    removeLastMarker()
  }
}

var removeLastMarker = function() {
	for (var i = 0; i < markers.length - 1; i++) {
  	markers[i].setMap(null)
  }
}

var closeAllInfoWindows = function() {
  for (var i=0;i<infoWindows.length;i++) {
     infoWindows[i].close();
  }
}
