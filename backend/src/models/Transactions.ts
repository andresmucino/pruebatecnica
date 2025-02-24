import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface ITransaction extends Document {
  transaction_id: string;
  client_id: string;
  amount: number;
  category: string;
  date: Date;
  type: "income" | "expense";
  status: "active" | "inactive";
}

const TransactionsSchema = new mongoose.Schema<ITransaction>({
  transaction_id: {
    unique: true,
    default: uuidv4,
    required: true,
    type: String,
  },
  client_id: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  type: { type: String, enum: ["income", "expense"] },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export default mongoose.model("Transactions", TransactionsSchema);
