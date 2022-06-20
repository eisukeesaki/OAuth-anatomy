const UserService = require("./UserService/UserService");
const OauthService = require("./OauthService/OauthService");

module.exports.userService = new UserService();
module.exports.oauthService = new OauthService();

