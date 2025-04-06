const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  const reply = `You said: "${userMessage}"`; // Replace with OpenAI reply if needed
  res.json({ reply });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
