import express from "express";
import passport from "passport";
import { CLIENT_BASE_URL } from "../config/server.config.js";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: CLIENT_BASE_URL + "/login",
  }),
  function (req, res) {
    res.redirect(CLIENT_BASE_URL);
  }
);

router.get("/check", (req, res) => {
  if (req.isAuthenticated) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Failed to log out" });
    }
    res.status(200).json({ message: "Logged out" });
  });
});

export default router;
