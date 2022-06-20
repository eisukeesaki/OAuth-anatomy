const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const userService = require("./lib/services/UserService/UserService");
const oauthService = require("./lib/services/OauthService/OauthService");
const { getAccessTokenHolder } = require("./lib/services/OauthService/OauthService");

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

app.post("/consent", (req, res) => {
  const { code } = req.body;
  const isValidCode = oauthService.isValidCode(code, req.session && req.session.userId);

  if (isValidCode) {
    const holder = oauthService.createAcessTokenHolder();
    res.redirect(`http://localhost:4000/token?token=${holder.accessToken}`); // 4000 = OAuthApp
  } else {
    console.log("received an invalid validation code");
    res.redirect("/validate");
  }
});

app.get("/profile", (req, res) => {
  const holder = oauthService.getTokenHolderByAccessToken(req.query.token);

  if (!holder) {
    console.log("failed to get token holder by access token");
    return res.redirect("/validate");
  }

  res.json(userService.getUserById(holder.userId));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views", "login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = userService.getUser(username, password);
  if (user && req.session)
    req.session.userId = user.id;
  else
    return res.status(400).end("invalid username or password");

  res.redirect("/validate");
});

module.exports = app;

