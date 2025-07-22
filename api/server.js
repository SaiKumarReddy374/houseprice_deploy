const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'https://houseprice-deploy.onrender.com',
}));
app.use(bodyParser.json());

// POST endpoint to get predictions from Python model
app.post('/predict', (req, res) => {
  const features = req.body;

  // Call the Python script
  const python = spawn('python', [path.join(__dirname, 'predict.py'), JSON.stringify(features)]);

  let result = '';
  let error = '';

  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    error += data.toString();
    console.error(`Python stderr: ${data}`);
  });

  python.on('close', (code) => {
    if (error) {
      return res.status(500).json({ error: 'Python error', detail: error });
    }

    try {
      const output = JSON.parse(result);
      res.json(output);
    } catch (err) {
      console.error('JSON parsing error:', err);
      res.status(500).json({ error: 'Error parsing prediction result' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
