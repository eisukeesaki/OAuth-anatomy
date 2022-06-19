const validationCode = "code";
const codeDb = {};

class OauthService {
  static createValidationCode(userId) {
    codeDb[validationCode] = userId;
    return validationCode;
  }
}

module.exports = OauthService;

