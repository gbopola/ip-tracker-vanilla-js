let IP_ADDRESS = document.querySelector('.ip-address');
let loc = document.querySelector('.ip-location');
let timezone = document.querySelector('.ip-timezone');
let isp = document.querySelector('.ip-isp');
let map;

function SearchIp(e, ipAddress){
    e.preventDefault()

    const userInputIp = document.querySelector('#user-input').value;
      // key and ip address variables
      const key = 'at_i2aWTD38COX3urd2INjt8nvY6Sm3I';

      fetch(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${userInputIp ? userInputIp : ''}`)
      .then((res) => res.json())
      .then((data) => {
          
          // Append api data to body
         IP_ADDRESS.innerText = data.ip;
         loc.innerText = `${data.location.city !== "" ? data.location.city + ', ' : "N/A"}${data.location.city !== "" ? data.location.country : ''}`;
         timezone.innerText = `${data.location.timezone !== "" ? `UTC ${data.location.timezone}` : "N/A"}` 
         isp.innerText = data.isp !== "" ? data.isp : "N/A";

        //   Stop map error
        if(map){
            map.remove();
            map = undefined
        }
          // Map Initialization
             map = L.map('map').setView([data.location.lat, data.location.lng], 13);

            // custom marker 
            let customMarker = L.icon({
                iconUrl: './images/icon-location.svg',
            })
            let marker = L.marker([data.location.lat, data.location.lng], {icon: customMarker}).addTo(map);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
               maxZoom: 19,
               attribution: '© OpenStreetMap'
           }).addTo(map);

            
      })
}

document.querySelector('#search').addEventListener('submit', (e) => SearchIp(e));
window.addEventListener('load', SearchIp)