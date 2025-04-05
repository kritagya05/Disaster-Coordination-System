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
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  const alertsContainer = document.getElementById("alerts-container");
  
  // Load alerts from Firebase
  function loadAlerts() {
    firebase.database().ref("disasterReports").on("value", (snapshot) => {
      alertsContainer.innerHTML = "";
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
      });
  
      snapshot.forEach((child) => {
        const alert = child.val();
  
        const card = document.createElement("div");
        card.classList.add("alert-card");
        card.innerHTML = `
          <h3>${alert["Disaster Type"] || "Unknown"}</h3>
          <p><strong>Location:</strong> ${alert["Location"] || "Unknown"}</p>
          <p><strong>Description:</strong> ${alert["Description"] || "None"}</p>
          <p><strong>Urgent:</strong> ${alert["urgent"] ? "Yes" : "No"}</p>
          <p><strong>Intensity:</strong> ${alert["intensity"] || "N/A"}</p>
        `;
        alertsContainer.appendChild(card);
  
        if (alert.lat && alert.lng) {
          L.marker([alert.lat, alert.lng])
            .addTo(map)
            .bindPopup(`<b>${alert["Disaster Type"]}</b><br>${alert["Location"]}`);
        }
  
        if (alert.urgent) {
          const beep = new Audio("https://www.soundjay.com/buttons/beep-07.wav");
          beep.play();
        }
      });
    });
  }
  
  // Add test alert
  function addTestAlert() {
    const testRef = database.ref("disasterReports").push();
    testRef.set({
      "Disaster Type": "Test Alert",
      "Location": "Test Location",
      "Description": "This is a simulated test alert.",
      "urgent": true,
      "intensity": "Moderate",
      "lat": 28.7041,
      "lng": 77.1025
    }).then(() => {
      alert("Test alert added.");
    }).catch((error) => {
      console.error("Error:", error);
    });
  }
  
  // Leaflet map
  const map = L.map("map").setView([28.6139, 77.2090], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
  
  document.getElementById("add-test-alert-btn").addEventListener("click", addTestAlert);
  
  loadAlerts();
  
  // Navbar toggle
  function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
  }
  