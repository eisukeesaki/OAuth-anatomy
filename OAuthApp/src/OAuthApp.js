const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const userService = require("./lib/services/UserService/UserService");

const app = express();

app.use(logger("dev"));
app.use(session({
  secret: "secret",
  name: "oauth-session",
  resave: false,
  saveUninitialized: true,
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
})

module.exports = app;

