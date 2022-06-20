const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const axios = require("axios");
const userService = require("./lib/services/UserService/UserService");

const app = express();

app.use(logger("dev"));
app.use(session({
  secret: "secret",
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

  res.end("if you received this message, you have a valid session");
});

app.get("/token", async (req, res) => {
  const profile = (await axios.get(`http://localhost:5000/profile?token=${req.query.token}`)).data;
  const user = userService.createUser(profile.id, profile.username, profile.password);

  if (req.session)
    req.session.userId = user.id;

  res.redirect("/");
});

module.exports = app;

