const tokenHolder = {
  accessToken: "aVulnerableToken",
  ttlInSeconds: 3600,
  scope: "profile",
  userId: 1,
  createdAt: Date.now()
}

const validationCode = "aVulnerableCode";
const codeDb = {};

class OauthService {
  static createValidationCode(userId) {
    codeDb[validationCode] = userId;
    return validationCode;
  }

  static isValidCode(code, userId) {
    const storedId = codeDb[code];
    const isValidCode = storedId === userId;

    if (isValidCode)
      return true;
    else
      return false;
  }

  static createAcessTokenHolder() {
    return tokenHolder;
  }

  static getTokenHolderByAccessToken(token) {
    if (token === "aVulnerableToken")
      return tokenHolder;
    else
      return null;
  }
}

module.exports = OauthService;

