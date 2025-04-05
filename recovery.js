// Firebase Config
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
  
  const form = document.getElementById("recoveryForm");
  const updatesList = document.getElementById("updatesList");
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = form.name.value.trim();
    const location = form.location.value.trim();
    const update = form.update.value.trim();
  
    if (name && location && update) {
      const newUpdate = {
        name,
        location,
        update,
        timestamp: new Date().toLocaleString()
      };
  
      database.ref("recovery-updates").push(newUpdate);
      form.reset();
    }
  });
  
  database.ref("recovery-updates").on("child_added", function(snapshot) {
    const data = snapshot.val();
    const li = document.createElement("li");
    li.innerHTML = `<strong>${data.name}</strong> (${data.location})<br>${data.update}<br><small>${data.timestamp}</small>`;
    updatesList.prepend(li);
  });
  