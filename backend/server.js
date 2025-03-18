import express from "express";
import path from "path";

import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import exploreRoutes from "./routes/explore.routes.js";
import userRoutes from "./routes/user.routes.js";

import session from "express-session";
import passport from "passport";
import { PORT } from "./config/server.config.js";
import "./passport/github.auth.js";

const app = express();
const __dirname = path.resolve();

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/check", (req, res) => {
  return res.status(200).json({ status: 200, message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/explore", exploreRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectMongoDB();
});
