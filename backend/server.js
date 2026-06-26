import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import donorRoutes from "./routes/donorRoutes.js";
import recipientRoutes from "./routes/recipientRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors())
app.use(express.json()); // Parse JSON bodies

// API Routes
app.use("/api/users", authRoutes); // or change route path if needed
// User authentication & profile
app.use("/api/donors", donorRoutes);       // Donor CRUD
app.use("/api/recipients", recipientRoutes); // Recipient CRUD
app.use("/api/hospitals", hospitalRoutes); // Hospital CRUD

// Root route
app.get("/", (req, res) => {
  res.send("Organ Donation System API is running...");
});

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
