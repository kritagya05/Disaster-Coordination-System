const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/chatbot", (req, res) => {
  const message = req.body.message.toLowerCase();
  let reply = "Please provide more details.";
  if (message.includes("flood")) reply = "Move to higher ground immediately and avoid water.";
  else if (message.includes("earthquake")) reply = "Drop, cover, and hold on. Stay away from windows.";
  else if (message.includes("cyclone")) reply = "Seek shelter and stay indoors. Secure loose items.";
  else if (message.includes("fire")) reply = "Evacuate the building and call emergency services.";
  else if (message.includes("help")) reply = "Emergency teams have been notified. Stay calm.";
  res.json({ reply });
});

app.listen(port, () => {
  console.log(`RescueSync server running at https://disaster-coordination-system.vercel.app/`);
});
