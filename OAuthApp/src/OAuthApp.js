const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const axios = require("axios");
const { userService } = require("./lib/services");

const app = express();

app.use(logger("dev"));
app.use(session({
  secret: "a-secret",
  name: "oauth-session",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  if (req.session) {
    const user = userService.getUserById(req.session && req.session.userId);
    if (!user)
      res.redirect("http://localhost:5000/validate"); // 5000 = oauthProvider
  }
  else
    return res.redirect("http://localhost:5000/validate"); // 5000 = oauthProvider

  res.end("This is a protected resource. If you are seeing this message, you have a valid session");
});

app.get("/token", async (req, res) => {
  const { data: profile } = await axios.get(`http://localhost:5000/profile?token=${req.query.token}`);
  const user = userService.createUser(profile.id, profile.username);

  if (req.session)
    req.session.userId = user.id;

  res.redirect("/");
});

module.exports = app;

