const oauthProviderApp = require("./src/OAuthProviderApp");
const port = 5000;

oauthProviderApp.listen(port, () => {
  console.log("oauthProviderApp is listening to port %d", port);
});

