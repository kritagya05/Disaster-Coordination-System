const alerts = [
    { type: "Flood", location: "Mumbai", severity: 8 },
    { type: "Earthquake", location: "Delhi", severity: 6 },
    { type: "Cyclone", location: "Odisha", severity: 9 }
  ];
  
  function loadAlerts() {
    const container = document.getElementById("alert-container");
    alerts.forEach(alert => {
      const div = document.createElement("div");
      div.className = "alert-item";
      div.innerHTML = `<strong>${alert.type}</strong> in ${alert.location} (Severity: ${alert.severity})`;
      container.appendChild(div);
    });
  }
  
  document.getElementById("disaster-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const type = document.getElementById("disaster-type").value;
    const severity = parseInt(document.getElementById("severity").value);
    let result = "Minor disaster.";
    if (severity >= 8) result = "Severe disaster!";
    else if (severity >= 5) result = "Moderate disaster.";
    document.getElementById("classification-result").innerText = `${type} is classified as: ${result}`;
  });
  
  function checkResources() {
    document.getElementById("resource-result").innerText = "Resources have been allocated and are en route.";
  }
  
  function initMap() {
    const map = L.map("map").setView([20.5937, 78.9629], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    L.marker([19.076, 72.8777]).addTo(map).bindPopup("Flood in Mumbai");
  }
  
  function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("show");
  }
  
  function sendMessage() {
    const input = document.getElementById("userInput").value;
    if (!input.trim()) return;

    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<div class='user-msg'>You: ${input}</div>`;
    document.getElementById("userInput").value = "";

    let message = input.toLowerCase();
    let reply = "Please provide more details.";

    if (message.includes("flood")) reply = "Move to higher ground immediately and avoid water.";
    else if (message.includes("earthquake")) reply = "Drop, cover, and hold on. Stay away from windows.";
    else if (message.includes("cyclone")) reply = "Seek shelter and stay indoors. Secure loose items.";
    else if (message.includes("fire")) reply = "Evacuate the building and call emergency services.";
    else if (message.includes("help")) reply = "Emergency teams have been notified. Stay calm.";

    setTimeout(() => {
      chatbox.innerHTML += `<div class='bot-msg'>Bot: ${reply}</div>`;
      chatbox.scrollTop = chatbox.scrollHeight;
    }, 500);
  }
  
  window.onload = () => {
    loadAlerts();
    initMap();
  };
  
  document.addEventListener('DOMContentLoaded', function () {
    const sosButton = document.getElementById('sosButton');
    const locationField = document.getElementById('locationField');
    const statusText = document.getElementById('status');
    const submitHidden = document.getElementById('submitHidden');
  
    sosButton.addEventListener('click', () => {
      statusText.textContent = 'Getting your location...';
  
      if (!navigator.geolocation) {
        statusText.textContent = 'Geolocation not supported by your browser.';
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const mapsURL = `https://www.google.com/maps?q=${latitude},${longitude}`;
          locationField.value = mapsURL;
          statusText.textContent = 'Sending your SOS...';
  
          // Programmatically submit the form
          submitHidden.click();
        },
        (error) => {
          statusText.textContent = 'Unable to retrieve location.';
          console.error('Geolocation error:', error);
        }
      );
    });
  });
  
  
  
  
  
  
