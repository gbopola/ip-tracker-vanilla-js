let IP_ADDRESS = document.querySelector('#ip-address');
let loc = document.querySelector('#location');
let timezone = document.querySelector('#timezone');
let isp = document.querySelector('#isp');
let accessToken = 'pk.eyJ1IjoiZ2JvcG9sYSIsImEiOiJja2tjbjFjdW4wbGRiMnVvYTJzOHdqYThrIn0.kNIHZ1JR1SJbGEZFb205cQ';
let array = [];
const ipAddress = document.querySelector('#search').value;

function SearchIp(e, ip){
    if(e){
        e.preventDefault();
    }
    
    // key and ip address variables
    const key = 'at_i2aWTD38COX3urd2INjt8nvY6Sm3I';
    

    fetch(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip ? ip: ''}`)
    .then((res) => res.json())
    .then((data) => {
        
        // Append api data to body
       IP_ADDRESS.innerHTML = data.ip;
       loc.innerHTML = `${data.location.city}, ${data.location.region}`;
       timezone.innerHTML = `UTC ${data.location.timezone}` 
       isp.innerHTML = data.isp;

       let lat = data.location.lat;
       let long = data.location.lng;

    //    push long and lat to array
       array.push(lat, long)

       let container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }



         // Map Initialization
         let mymap = L.map('map').setView(array, 13);
         L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
             maxZoom: 18,
             id: 'mapbox/streets-v11',
             tileSize: 512,
             zoomOffset: -1,
             accessToken: accessToken
         }).addTo(mymap);
    
         let marker = L.marker(array).addTo(mymap);

        //  clear array after map is initilized
         array = [];

    })
}

document.querySelector('.search-form').addEventListener('submit', (e, ip) => SearchIp(e, ipAddress));
window.addEventListener('load', SearchIp)
 

 

 


 

 