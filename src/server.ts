import express from "express";
import cors from "cors";
import { routes } from "./routes";
import process from "process";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/healthcheck', (_req, res) => {
  res.json({
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});


app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
