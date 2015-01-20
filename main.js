//mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyNzc3IiwiYSI6IlBGMW9neXMifQ.ZaXP2xGcMBY0dRvIBA3nkQ';
L.mapbox.accessToken = 'pk.eyJ1IjoiaGFyNzc3IiwiYSI6IlBGMW9neXMifQ.ZaXP2xGcMBY0dRvIBA3nkQ';

/*
var map = new mapbox.Map({
  container: 'map', // container id
  style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v6.json', //stylesheet location
  center: [-34.9207, 138.6008], // starting position
  zoom: 14 // starting zoom
});
*/

var map = L.mapbox.map('map');

L.mapbox.tileLayer('har777.b2afdd7d').addTo(map);

var overlay = L.mapbox.tileLayer('examples.map-i86l3621').addTo(map);
var range = document.getElementById('range');

range['oninput' in range ? 'oninput' : 'onchange'] = clip;
map.on('move', clip);

map.setView([-34.9207, 138.6008], 14);

clip();

// Credit Foursquare for their wonderful data
map.attributionControl
    .addAttribution('<a href="https://foursquare.com/">Places data from Foursquare</a>');

// Create a Foursquare developer account: https://developer.foursquare.com/
// NOTE: CHANGE THESE VALUES TO YOUR OWN:
// Otherwise they can be cycled or deactivated with zero notice.
var CLIENT_ID = 'L4UK14EMS0MCEZOVVUYX2UO5ULFHJN3EHOFVQFSW0Z1MSFSR';
var CLIENT_SECRET = 'YKJB0JRFDPPSGTHALFOEP5O1NDDATHKQ2IZ5RO2GOX452SFA';



// https://developer.foursquare.com/start/search
var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/search' +
  '?client_id=CLIENT_ID' +
  '&client_secret=CLIENT_SECRET' +
  '&v=20130815' +
  '&ll=LATLON' +
  '&query=TERM' +
  '&callback=?';

// Keep our place markers organized in a nice group.
var foursquarePlaces = L.layerGroup().addTo(map);

function search(term) {
	// Use jQuery to make an AJAX request to Foursquare to load markers data.
	$.getJSON(API_ENDPOINT
	    .replace('CLIENT_ID', CLIENT_ID)
	    .replace('CLIENT_SECRET', CLIENT_SECRET)
	    .replace('TERM', term)
	    .replace('LATLON', map.getCenter().lat +
	        ',' + map.getCenter().lng), function(result, status) {

	    if (status !== 'success') return alert('Request to Foursquare failed');

	    // Transform each venue result into a marker on the map.
	    for (var i = 0; i < result.response.venues.length; i++) {
	      var venue = result.response.venues[i];
	      var latlng = L.latLng(venue.location.lat, venue.location.lng);
	      var marker = L.marker(latlng, {
	          icon: L.mapbox.marker.icon({
	            'marker-color': '#BE9A6B',
	            'marker-size': 'large'
	          })
	        })
	      .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
	        venue.name + '</a></strong>')
	        .addTo(foursquarePlaces);
	    }

	});
}

Polymer('update-form', {
	updateMap: function() {

		if(this.search_term != NaN) {
			search(this.search_term);
		}
	}
});

function clip() {
  var nw = map.containerPointToLayerPoint([0, 0]),
      se = map.containerPointToLayerPoint(map.getSize()),
      clipX = nw.x + (se.x - nw.x) * range.value;

  overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
}