import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import complaintRoutes from "./routes/complaint.routes";
import alertRoutes from "./routes/alert.routes";
import guardianRoutes from "./routes/guardian.routes";
import mlRoutes from "./routes/ml.routes";
import twilioRoutes from "./routes/twilio.routes";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:8080";
app.use(cors({ origin: corsOrigin.split(","), credentials: true }));

app.get("/", (_req, res) => {
  res.json({ success: true, message: "ANWESHAN Backend Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/guardians", guardianRoutes);
app.use("/api/ml", mlRoutes);
app.use("/api/twilio", twilioRoutes);

export default app; 