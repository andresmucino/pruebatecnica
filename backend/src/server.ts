import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import transactionsRoutes from "./routes/index";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
connectDB()
app.use("/transactions", transactionsRoutes);

app.listen(PORT, () => {
  console.log(`Server run in port: http://localhost:${PORT}`);
});
