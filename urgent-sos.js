function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
  }
  
  // Autofill geolocation
  window.onload = function () {
    const locationInput = document.getElementById("locationInput");
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
          const data = await response.json();
          locationInput.value = data.display_name || `${lat}, ${lon}`;
        } catch {
          locationInput.value = `${lat}, ${lon}`;
        }
      }, function () {
        locationInput.value = "Unable to access location";
      });
    } else {
      locationInput.value = "Geolocation not supported";
    }
  };
  
  // Beep + Reset
  document.getElementById("sosForm").addEventListener("submit", function () {
    const beep = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");
    beep.play();
  
    setTimeout(() => {
      document.getElementById("sosForm").reset();
      document.getElementById("status").innerText = "🚨 SOS Sent! Help is on the way.";
    }, 500);
  });
  