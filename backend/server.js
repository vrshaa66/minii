
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pg from "pg";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";
import crypto from "crypto";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
async function sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "varshakk2005@gmail.com",
            pass: "dysv okzu unnj aiva",
        },
    });

    const mailOptions = {
        from: "varshakk2005@gmail.com",
        to: email,
        subject: "Verify Your Email",
        // text: `Click this link to verify your email: http://localhost:5173/verify?token=${token}`,
        text: `Click this link to verify your email: http://localhost:5173/verify/${token}`,
    };

    await transporter.sendMail(mailOptions);
}

async function getAllNonAdminUserEmails() {
    try {
        const result = await pool.query("SELECT email, is_admin FROM users WHERE is_verified = TRUE");
        return result.rows.filter(row => !row.is_admin).map(row => row.email);
    } catch (error) {
        console.error("Error fetching non-admin user emails:", error);
        return [];
    }
}

// Function to send notification email for a new event
async function sendNewEventNotificationEmail(email, eventName, eventId) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "varshakk2005@gmail.com",
            pass: "dysv okzu unnj aiva",
        },
    });

    const eventLink = `http://localhost:5173/event/${eventId}`; // Construct the link to the event details page

    const mailOptions = {
        from: "varshakk2005@gmail.com",
        to: email,
        subject: `New Event Alert: ${eventName} is Now Live!`,
        html: `<p>Hello!</p>
               <p>A new event, <strong>${eventName}</strong>, has been approved and is now available on our website.</p>
               <p>Click the link below to view more details and apply:</p>
               <p><a href="${eventLink}">${eventName} Details</a></p>
               <p>Don't miss out!</p>`, // Use HTML for better formatting
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${email} for event: ${eventName}`);
    } catch (error) {
        console.error(`Error sending notification email to ${email} for event ${eventName}:`, error);
    }
}

app.post("/approve-event/:id", async (req, res) => {
    const { id } = req.params;
    const { approved } = req.body;

    try {
        const eventResult = await pool.query("SELECT event_name FROM events WHERE id = $1", [id]);
        if (eventResult.rows.length > 0) {
            const eventName = eventResult.rows[0].event_name;

            await pool.query("UPDATE events SET approved = $1 WHERE id = $2", [approved, id]);
            res.json({ message: "Event approval updated" });

            if (approved) {
                // Fetch all NON-ADMIN user emails
                const nonAdminUserEmails = await getAllNonAdminUserEmails();
                // Send notification emails to all non-admin users
                for (const email of nonAdminUserEmails) {
                    await sendNewEventNotificationEmail(email, eventName, id);
                }
            }
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (error) {
        console.error("Error updating approval:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(20).toString("hex");

        await pool.query(
            "INSERT INTO users (name, email, password, verification_token, is_verified) VALUES ($1, $2, $3, $4, FALSE)",
            [name, email, hashedPassword, verificationToken]
        );

        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/verify", async (req, res) => {
    const { token } = req.query;

    try {
        console.log("Verification Token:", token);
        const user = await pool.query("SELECT * FROM users WHERE verification_token = $1", [token]);
        if (user.rows.length === 0) {
            return res.status(400).send("Invalid verification token");
        }
        console.log("User found:", user.rows[0]);
        await pool.query("UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = $1", [
            user.rows[0].id,
        ]);
        console.log("User verified successfully");
        res.send("Email verified successfully! You can now log in.");
      
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).send("Internal Server Error");
       
    }
});

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

        if (!user.rows[0].is_verified) {
            return res.status(401).json({ message: "Please verify your email before logging in." });
        }

        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Login successful",
            token,
            isAdmin: user.rows[0].is_admin,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/verify-email", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        pool.query("SELECT email, is_admin FROM users WHERE id = $1", [decoded.userId], (dbErr, results) => {
            if (dbErr) {
                return res.status(500).json({ message: "Database error" });
            }

            if (results.rows.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({
                email: results.rows[0].email,
                isAdmin: results.rows[0].is_admin,
            });
        });
    });
});

app.post(
    "/upload-event",
    upload.fields([
        { name: "idCard", maxCount: 1 },
        { name: "eventImage", maxCount: 1 },
    ]),
    async (req, res) => {
        // ... (your existing upload-event code) ...
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
app.post("/approve-event/:id", async (req, res) => {
    const { id } = req.params;
    const { approved } = req.body;

    try {
        const eventResult = await pool.query("SELECT event_name FROM events WHERE id = $1", [id]);
        if (eventResult.rows.length > 0) {
            const eventName = eventResult.rows[0].event_name;

            await pool.query("UPDATE events SET approved = $1 WHERE id = $2", [approved, id]);
            res.json({ message: "Event approval updated" });

            if (approved) {
                // Fetch all user emails
                const allUserEmails = await getAllUserEmails();
                // Send notification emails to all users
                for (const email of allUserEmails) {
                    await sendNewEventNotificationEmail(email, eventName, id);
                }
            }
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (error) {
        console.error("Error updating approval:", error);
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

