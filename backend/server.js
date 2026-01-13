const express = require('express');
const app = express();
const PORT = 3000;


let news =[{title:"title1", content:"content1",date:new Date("2025-12-25")}, {title:"title2", content:"content2",date:new Date("2025-11-25")}, {title:"title3", content:"content3",date:new Date("2025-10-25")}];

// Middleware to parse JSON data
app.use(express.json());

const cors = require('cors');

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);

// Basic Route (GET request)
app.get('/latestnews', (req, res) => {
  res.json(news);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});