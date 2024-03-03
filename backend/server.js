import cors from "cors";

import express from "express";

import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import exploreRoutes from "./routes/explore.routes.js";
import userRoutes from "./routes/user.routes.js";

import session from "express-session";
import passport from "passport";
import { CLIENT_BASE_URL, PORT } from "./config/server.config.js";
import "./passport/github.auth.js";

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
    origin: CLIENT_BASE_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send({
    status: 200,
    message: "Server is up!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectMongoDB();
});
