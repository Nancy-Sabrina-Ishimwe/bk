import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db';
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index";
import { errorHandler } from './middleware/errorHandler';  

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1", router);


// Global error handler – must be after routes
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: http://localhost:${PORT}`);
});