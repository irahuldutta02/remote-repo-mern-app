import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import exploreRoutes from "./routes/explore.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();
app.use(cors());
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server is up!");
});

app.use("/api/user", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
