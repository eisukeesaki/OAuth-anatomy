const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const userService = require("./lib/services/UserService/UserService");
const oauthService = require("./lib/services/OauthService/OauthService");

const app = express();

app.use(logger("dev"));
app.use(session({
  secret: "secret",
  name: "oauth-provider-session",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.get("/validate", (req, res) => {
  if (req.session) {
    const user = userService.getUserById(req.session && req.session.userId);
    if (!user)
      return res.redirect("/login");
  } else
    return res.redirect("/login");

  res.render("consent.ejs", { validationCode: oauthService.createValidationCode(req.session.userId) });
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views", "login.html"));
});

module.exports = app;

