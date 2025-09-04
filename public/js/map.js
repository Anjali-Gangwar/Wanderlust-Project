// mapboxgl.accessToken = mapToken;
// if (!listing.geometry || !listing.geometry.coordinates || listing.geometry.coordinates.length < 2) {
//     console.error("Invalid geometry:", listing.geometry);
// } else {
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12',
//     center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//     zoom: 9 // starting zoom

// })
// };



// const marker = new mapboxgl.Marker({color: "red"})
//         .setLngLat(listing.geometry.coordinates)
//         .setPopup(
//             new mapboxgl.Popup({offset:25 }).setHTML(
//         `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`
//             )
//         )
//         .addTo(map);
console.log("Coordinates from DB:", listing.geometry);

if (
  listing.geometry &&
  listing.geometry.coordinates &&
  listing.geometry.coordinates.length === 2
) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, // [lng, lat]
    zoom: 9,
    accessToken: mapToken
  });

  new mapboxgl.Marker()
    .setLngLat(listing.geometry.coordinates)
    .addTo(map);
} else {
  console.error("❌ Invalid geometry:", listing.geometry);
  document.getElementById("map").innerHTML = "<p>No location data available</p>";
}

