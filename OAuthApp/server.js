const oauthApp = require("./src/OAuthApp");
const port = 4000;

oauthApp.listen(port, () => {
  console.log("oauthApp is listening to port %d\n", port)
});

