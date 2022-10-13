
const myMap = {
  coordinates: [],
  businesses: [],
  map: {},
  markers: {},

  buildMap() {
    this.map = L.map('map', {
      center: this.coordinates,
      zoom: 11,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: '15'
    }).addTo(this.map);

    const marker = L.marker(this.coordinates)
    marker 
      .addTo(this.map)
      .bindPopup('<p1><b>You are here</b><br></p1>')
      .openPopup()

      var i = 0;
      var businesses = [{
        name: "coffee",
        properties: {
          getBusiness(){},
        },
        name: "restaurant",
        properties: {
          getBusiness(){},
        },
        name: "hotel",
        properties: {
          getBusiness(){},
        },
        name: "market",
        properties: {
          getBusiness(){}
        }
      }];
      var props = businesses[i].properties;
      var markers = L.markers(businesses[i].properties)
      marker 
        .addTo(this.map)
        .bindPopup(`<p>${business.name}</p>`)
  }
}

async function getCoords() {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  });
  return [pos.coords.latitude, pos.coords.longitude]

}

//foursquare stuff below
//my api key: fsq3rmVAQNxS0HBbAWTJGnslK/0S+Ln8twtXIJF4iUAneJw=

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'fsq3rmVAQNxS0HBbAWTJGnslK/0S+Ln8twtXIJF4iUAneJw='
  }
}

async function getBusiness(){
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?query=' + `${business}` + '&ll=' + `${pos.coords.latitude}` + '%2C' + `${pos.coords.longitude}` + '&limit=5', options)
  var result = await response.text();
  return [result.latitude, result.longitude];
}

window.onload = async () => {
  const coords = await getCoords()
  console.log(coords)
  myMap.coordinates = coords
  // const position = await getBusiness()
  // console.log(position)
  // myMap.businesses = position
  myMap.buildMap()
}

document.getElementById('submit').addEventListener('click', async (event) => {
  event.preventDefault()
  let business = documentgetElementById('business').value
  console.log(business)
})