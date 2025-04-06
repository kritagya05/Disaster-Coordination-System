// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAB24-iciGhyT0KlMk9NLE1odQPc5KTWzQ",
    authDomain: "rescuesync-427d8.firebaseapp.com",
    databaseURL: "https://rescuesync-427d8-default-rtdb.firebaseio.com",
    projectId: "rescuesync-427d8",
    storageBucket: "rescuesync-427d8.appspot.com",
    messagingSenderId: "638661212689",
    appId: "1:638661212689:web:e22874c19f86458fd80fb0"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  // Alert container and audio
  const alertsContainer = document.getElementById("alerts");
  const beep = document.getElementById("alert-sound");
  
  // Leaflet map setup
  const map = L.map('map').setView([28.6139, 77.2090], 5); // India center
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // Fetch and display alerts
  db.ref("disaster_alerts").on("child_added", (snapshot) => {
    const alert = snapshot.val();
  
    const alertCard = document.createElement("div");
    alertCard.className = "alert-card" + (alert.urgent ? " urgent" : "");
    alertCard.innerHTML = `
      <h3>${alert["Disaster Type"]}</h3>
      <p><strong>Location:</strong> ${alert.Location}</p>
      <p><strong>Intensity:</strong> ${alert.intensity || "Unknown"}</p>
      <p>${alert.Description}</p>
    `;
    alertsContainer.appendChild(alertCard);
  
    if (alert.lat && alert.lng) {
      L.marker([alert.lat, alert.lng]).addTo(map)
        .bindPopup(`<b>${alert["Disaster Type"]}</b><br>${alert.Location}`);
    }
  
    if (alert.urgent) {
      beep.play();
    }
  });
  
  // Add test alert button
  function addTestAlert() {
    const newAlert = {
      "Disaster Type": "Test Alert",
      Location: "Test Location",
      Description: "This is a simulated test alert.",
      urgent: true,
      intensity: "Moderate",
      lat: 28.7041,
      lng: 77.1025
    };
  
    db.ref("disaster_alerts").push(newAlert);
  }
  
