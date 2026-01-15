const express = require("express");
const app = express();
const PORT = 3000;

let lnews = [];

const cors = require("cors");

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fos",
  waitForConnections: true,
  connectionLimit: 10, // Max number of connections to keep open
  queueLimit: 0,
});

// Function to fetch latest news from the database
async function fetchLatestNews() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM news ORDER BY date DESC LIMIT 3;"
    );
    lnews = rows;
    console.log("Latest news fetched:", lnews);
  } catch (err) {
    console.error("Error fetching latest news:", err);
  }
}

// Middleware to parse JSON data
app.use(express.json());

app.use(express.static("public"));

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);

// Basic Route (GET request)
app.get("/latestnews", (req, res) => {
  res.json(lnews);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

fetchLatestNews();
