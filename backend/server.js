const express = require("express");
const app = express();
const PORT = 3000;

let lnews = [];

const cors = require("cors");

const mysql = require("mysql2/promise");

const crypto = require("crypto");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fos",
  waitForConnections: true,
  connectionLimit: 10, // Max number of connections to keep open
  queueLimit: 0,
});

//images
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Function to fetch latest news from the database
async function fetchLatestNews() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM news ORDER BY date DESC LIMIT 3;"
    );
    lnews = rows;
    console.log("Latest news fetched:", lnews.length);
  } catch (err) {
    console.error("Error fetching latest news:", err);
  }
}

async function crateToken(username) {
  const token = crypto.randomBytes(16).toString("hex") + "-" + username;
  await pool.query("UPDATE admin SET token = ? WHERE username = ?", [token, username]);
  return token;
}

async function verifylogin(username, password) {
  try {
    const user = await pool.query("SELECT * FROM admin WHERE username = ? AND password = ?", [username, password]);
    return user[0];
  } catch (err) {
    console.error("Error verifying login:", err);
    return null;
  }
}

async function isTokenValid(token) {
  try {
    const [rows] = await pool.query("SELECT * FROM admin WHERE token = ?", [token]);
    console.log("Token verification rows:", rows);
    return rows.length > 0;
  } catch (err) {
    console.error("Error verifying token:", err);
    return false;
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

app.get("/latestnews", (req, res) => {
  res.json(lnews);
});

// -----------------Admin-----------------

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  verifylogin(username, password).then(async (user) => {
    if (user.length > 0) {
      console.log("Login successful for user:", username);
      let token = await crateToken(username);
      res.json({ success: true, token: token });
      console.log("Generated token for user:", username, token);
    } else {
      console.log("Login failed for user:", username);
    }
  })
});

app.post("/createNews", upload.single("image"), async (req, res) => {
  const { title, content, date, token } = req.body;
  const imagePath = "images/" + req.file.filename;
  console.log("Received news item:", title, token);
  if (await isTokenValid(token)) {
    try {
      const [result] = await pool.query(
        "INSERT INTO news (title, content, date, image_path) VALUES (?, ?, ?, ?)",
        [title, content, date, imagePath]
      );
      console.log("News item inserted:", result.insertId);
      fetchLatestNews(); // Refresh latest news
      res.json({ success: true });
    } catch (err) {
      console.error("Error inserting news item:", err);
      res.json({ success: false, message: "Database error" });
    }
  }
  else {
    res.json({ success: false, message: "Invalid token" });
  }

});

app.post("/autologin", async (req, res) => {
  const { token } = req.body;
  if (await isTokenValid(token)) {
    res.json({ success: true });
    console.log("Auto-login successful for token:", token);
  } else {
    res.json({ success: false });
  }
});

// ------------------Feedback-----------------

app.post("/feedbacks", async (req, res) => {
  const { token } = req.body;
  if (await isTokenValid(token)) {
    try {
      const [rows] = await pool.query("SELECT * FROM feedback ORDER BY submitted_at DESC;");
      var responseData = {
        success: true,
        feedbacks: rows
      };
      res.json(responseData);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      res.json({ success: false, message: "Database error" });
    }
  }
});

app.post("/submitFeedback", async (req, res) => {
  const { student_name, student_id, email, message_body } = req.body;
  try {
    const timeStamp = new Date();
    const [result] = await pool.query(
      "INSERT INTO feedback (student_name, student_id, email, message_body, submitted_at) VALUES (?, ?, ?, ?, NOW())",
      [student_name, student_id, email, message_body, timeStamp]
    );
    console.log("Feedback submitted:", result.insertId);
    res.json({ success: true });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.json({ success: false, message: "Database error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

fetchLatestNews();