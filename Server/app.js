import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import jobs from "./routes/jobs.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Define routes
app.use("/auth", auth);
app.use("/jobs", jobs);

// Serve static files from the React app
const __dirname = path.dirname(new URL(import.meta.url).pathname); // Get __dirname equivalent
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Handle client-side routing (optional)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Connect to MongoDB
const connectDB = (uri) => {
    mongoose.connect(uri)
        .then(() => {
            console.log("connected to DB");
            app.listen(3000, () => {
                console.log("Server running on port 3000");
            });
        })
        .catch((error) => { 
            console.log(error); 
        });
};

// Call the connectDB function with your MONGO_URI
connectDB(process.env.MONGO_URI);
