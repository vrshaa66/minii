// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import pg from "pg";

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 5000;

// const { Pool } = pg;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Sign Up Route
// app.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (userExists.rows.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [
//       name,
//       email,
//       hashedPassword,
//     ]);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Sign In Route
// app.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (user.rows.length === 0) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
//     if (!isValidPassword) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pg from "pg";
import multer from "multer";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use("/uploads",express.static('uploads'));
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


app.post("/signup", async (req, res) => {
  // ... (your existing signup code)
    const { name, email, password } = req.body;

  try {
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Sign In Route (unchanged)
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Correctly send isAdmin in the response
    res.json({
      message: "Login successful",
      token,
      isAdmin: user.rows[0].is_admin, // Corrected line
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post(
  "/upload-event",
  upload.fields([
    { name: "idCard", maxCount: 1 },
    { name: "eventImage", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);
    try {
      const {
        name,
        email,
        collegeName,
        eventName,
        venue,
        deadline,
        applyLink,
        additionalInfo,
      } = req.body;
      const idCard = req.files["idCard"] ? req.files["idCard"][0].filename : null;
      const eventImage = req.files["eventImage"]
        ? req.files["eventImage"][0].filename
        : null;

      await pool.query(
        "INSERT INTO events (name, email, college_name, id_card, event_name, venue, deadline, apply_link, event_image, additional_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        [
          name,
          email,
          collegeName,
          idCard,
          eventName,
          venue,
          deadline,
          applyLink,
          eventImage,
          additionalInfo,
        ]
      );
      res.status(201).json({ message: "Event uploaded successfully" });
    } catch (error) {
      console.error("Error uploading event:", error);
      res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
  }
);
app.get("/all-events", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Admin Approval Route
app.post("/approve-event/:id", async (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;

  try {
    await pool.query("UPDATE events SET approved = $1 WHERE id = $2", [
      approved,
      id,
    ]);
    res.json({ message: "Event approval updated" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/approved-events", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events WHERE approved = TRUE");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/delete-event/:id", async (req, res) => {
  const { id } = req.params;

  try {
      await pool.query("DELETE FROM events WHERE id = $1", [id]);
      res.json({ message: "Event deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});


// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


  