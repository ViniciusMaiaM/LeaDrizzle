import express from "express";
import cors from "cors";
import { routes } from "./routes";
import process from "process";
import { seedInitialCategories } from "./drizzle/seeds/seedInitialCategories";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/healthcheck", (_req, res) => {
  res.json({
    message: "Server is running",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Seed categories when the server starts
seedInitialCategories()
  .then(() => {
    console.log("Categories seeded successfully");
  })
  .catch((error) => {
    console.error("Error seeding categories:", error);
  });

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
