let map = L.map('map', {
    layers: MQ.hybridLayer(),
    center: [55.751510320332756, 37.616807268405466],
    zoom: 12
});

document.getElementsByClassName("leaflet-bottom leaflet-left")[0].remove();
document.getElementsByClassName("leaflet-bottom leaflet-right")[0].remove();

function route(start, stop) {
    start = start.split(">")
    start = [parseFloat(start[0]), parseFloat(start[1])]
    stop = stop.split(">")
    stop = [parseFloat(stop[0]), parseFloat(stop[1])]
    
    console.log(start, stop)

    let dir = MQ.routing.directions();
    dir.route({
        locations: [
            {latLng: {lat: start[1], lng: start[0]}},
            {latLng: {lat: stop[1], lng: stop[0]}}
        ]
    })

    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: "https://raw.githubusercontent.com/ruvictor/map-app-directions/master/img/red.png",
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        },
        createEndMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/ruvictor/map-app-directions/master/img/blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        }
    });

    map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    })); 
}
