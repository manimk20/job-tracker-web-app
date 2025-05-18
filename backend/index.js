import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { signup,login } from "./controllers/authController.js";
import { createJob, getJobs, updateJob, deleteJob } from "./controllers/jobController.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
const allowedOrigin = "https://job-tracker-web-app-gamma.vercel.app/";
const app = express();
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));
app.use(express.json());

app.get("/", (req,res) => {
    res.send("API is working");
});

app.post("/api/signup", signup);
app.post("/api/login", login);
app.post("/api/jobs", protect, createJob);
app.get("/api/jobs", protect, getJobs);
app.put("/api/jobs/:id", protect, updateJob);
app.delete("/api/jobs/:id", protect, deleteJob);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port:http://localhost:${PORT}`);
});