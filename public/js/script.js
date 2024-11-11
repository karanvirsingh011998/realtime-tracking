const socket = io()

if (navigator.geolocation) {
    console.log('enabled location')
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords
        socket.emit("send-location", { latitude, longitude })
    },
        (error) => {
            console.log('error', error)
        },
        {
            enableHighAccuracy: true,
            timeout: 5000, // check again after 5 sec
            maximumAge: 0, // cahcing disabled
        }
    )
}

map = L.map("map").setView([0, 0], 10)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: 'Karanvir Singh'
}).addTo(map);


const markers = {


}

socket.on("receive-location", (data) => {
    console.log('data', data)
    const { id, latitude, longitude } = data
    map.setView([latitude, longitude])

    if (markers[id]) {
        console.log('if')
        markers[id].setLatLng([latitude, longitude])
    }
    else {
        console.log('else')
        markers[id] = L.marker([latitude, longitude]).addTo(map)
    }
})

socket.on('user-diconnect',()=>{
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id]
    }
}
)
