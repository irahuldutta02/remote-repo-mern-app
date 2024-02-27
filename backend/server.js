import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import exploreRoutes from "./routes/explore.routes.js";
import userRoutes from "./routes/user.routes.js";

import "./passport/github.auth.js";
import passport from "passport";
import session from "express-session";

dotenv.config();
const app = express();

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is up!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectMongoDB();
});
