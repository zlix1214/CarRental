import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
await connectDB();

app.get("/", (req, res) => res.send("Server is running..."));
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
