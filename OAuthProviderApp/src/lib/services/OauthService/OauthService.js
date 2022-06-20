let tokenHolder = {
  accessToken: "anAccessToken",
  ttlInSeconds: 3600,
  scope: "profile",
  userId: 1,
  createdAt: Date.now()
}

const validationCode = "aValidationCode";
const codeDb = {};

class OauthService {
  createValidationCode(userId) {
    codeDb[validationCode] = userId;
    return validationCode;
  }

  isValidCode(code, userId) {
    const storedId = codeDb[code];
    const isValidCode = storedId === userId;

    if (isValidCode)
      return true;
    else
      return false;
  }

  createAcessTokenHolder() {
    return tokenHolder;
  }

  getTokenHolderByAccessToken(token) {
    if (token === "anAccessToken")
      return tokenHolder;
    else
      return null;
  }
}

module.exports = OauthService;

