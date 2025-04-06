

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
 import fs from 'fs';
 import { fileURLToPath } from 'url';


 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
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


 // Configure multer for event uploads
 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
  cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
 });


 const upload = multer({ storage: storage });


 // Configure multer for temporary notes uploads (for admin review)
 const tempNotesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
  const tempPath = path.join(__dirname, 'temp_uploads'); // Temporary folder
  fs.mkdirSync(tempPath, { recursive: true });
  cb(null, tempPath);
  },
  filename: (req, file, cb) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
 });


 const tempNotesUpload = multer({ storage: tempNotesStorage });
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

// database
app.get('/api/modules/:subjectcode', async (req, res) => {
    const { subjectcode } = req.params;
    try {
      const result = await pool.query(
        'SELECT module_number, resource_type, resource_url FROM module_resources WHERE subject_code = $1',
        [subjectcode]
      );
  
      // Structure the data in a way that the frontend expects
      const modules = {};
      result.rows.forEach(row => {
        if (!modules[row.module_number]) {
          modules[row.module_number] = {};
        }
        modules[row.module_number][row.resource_type] = row.resource_url;
      });
       // Convert the structured object into an array for easier mapping in the frontend
    const modulesArray = Object.keys(modules)
    .sort((a, b) => parseInt(a) - parseInt(b)) // Sort by module number
    .map(moduleNumber => ({
      module: `Module ${moduleNumber}`,
      ...modules[moduleNumber],
    }));

  res.json(modulesArray);
} catch (error) {
  console.error('Error fetching module resources:', error);
  res.status(500).json({ message: 'Failed to fetch module resources', error: error.message });
}
});
// database end

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

 // ... (Your email sending functions: sendVerificationEmail, getAllNonAdminUserEmails, sendNewEventNotificationEmail)

 // ... (Your signup, signin, verify-email, upload-event, all-events, approved-events, delete-event, approve-event API endpoints)

 // **Updated Notes Upload API**
 app.post('/api/upload-notes', tempNotesUpload.single('notes_file'), async (req, res) => {
  if (!req.file) {
  return res.status(400).json({ message: 'Please upload a file.' });
  }


  const {
  uploader_name,
  college,
  subject,
  scheme,
  branch,
  semester,
  email,
  copyright_name,
  } = req.body;


  const temp_file_path = path.join('temp_uploads', req.file.filename); // Temporary path


  try {
  await pool.query(
  `
  INSERT INTO uploaded_notes (
  uploader_name,
  college,
  subject,
  scheme,
  branch,
  semester,
  email,
  copyright_name,
  temp_file_path,
  approved
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, FALSE)
  `,
  [
  uploader_name,
  college,
  subject,
  scheme,
  branch,
  semester,
  email,
  copyright_name,
  temp_file_path,
  ]
  );


  res.status(200).json({ message: 'Notes uploaded for review!' });
  } catch (error) {
  console.error('Database error:', error);
  // Delete the temporary file if database insert fails
  fs.unlinkSync(path.join(__dirname, temp_file_path));
  res.status(500).json({ message: 'Failed to save notes information.', error: error.message });
  }
 }, (error, req, res, next) => {
  console.error('Multer error:', error);
  if (error instanceof multer.MulterError) {
  return res.status(400).json({ message: 'File upload error: ' + error.message });
  }
  return res.status(500).json({ message: 'Server error during file upload.', error: error.message });
 });


 // **Admin Panel API Endpoints for Notes**

 // Get pending notes
 app.get('/admin/notes', async (req, res) => {
  try {
  const result = await pool.query('SELECT * FROM uploaded_notes WHERE approved = FALSE');
  res.json(result.rows);
  } catch (error) {
  console.error('Error fetching pending notes:', error);
  res.status(500).json({ message: 'Failed to fetch pending notes.', error: error.message });
  }
 });

 // Approve a note
 app.post('/admin/approve-note/:id', async (req, res) => {
  const { id } = req.params;

  try {
  const note = await pool.query('SELECT * FROM uploaded_notes WHERE id = $1', [id]);
  if (note.rows.length === 0) {
  return res.status(404).json({ message: 'Note not found.' });
  }

  // Move the file from temp to final location
  const finalFilePath = path.join(
  'public',
  'uploads',
  note.rows[0].scheme,
  note.rows[0].branch,
  note.rows[0].semester,
  note.rows[0].subject,
  path.basename(note.rows[0].temp_file_path) // Keep original filename
  );

  fs.mkdirSync(path.dirname(finalFilePath), { recursive: true });
  fs.renameSync(path.join(__dirname, note.rows[0].temp_file_path), path.join(__dirname, finalFilePath));

  // Update the database
  await pool.query(
  'UPDATE uploaded_notes SET approved = TRUE, file_path = $1, temp_file_path = NULL WHERE id = $2',
  [finalFilePath, id]
  );

  res.json({ message: 'Note approved successfully.' });
  } catch (error) {
  console.error('Error approving note:', error);
  res.status(500).json({ message: 'Failed to approve note.', error: error.message });
  }
 });

 // Reject a note
 app.delete('/admin/reject-note/:id', async (req, res) => {
  const { id } = req.params;

  try {
  const note = await pool.query('SELECT * FROM uploaded_notes WHERE id = $1', [id]);
  if (note.rows.length === 0) {
  return res.status(404).json({ message: 'Note not found.' });
  }

  // Delete the temporary file
  fs.unlinkSync(path.join(__dirname, note.rows[0].temp_file_path));

  // Delete the database record
  await pool.query('DELETE FROM uploaded_notes WHERE id = $1', [id]);

  res.json({ message: 'Note rejected and deleted.' });
  } catch (error) {
  console.error('Error rejecting note:', error);
  res.status(500).json({ message: 'Failed to reject note.', error: error.message });
  }
 });


 app.listen(port, () => {
  console.log(`Server running on port ${port}`);
 });