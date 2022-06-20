const tokenHolder = {
  accessToken: "aVulnerableToken",
  ttlInSeconds: 3600,
  scope: "profile",
  userId: "1",
  createdAt: Date.now()
}

const validationCode = "aVulnerableCode";
const codeDb = {};
console.log("codeDb@global:\n%o\n", codeDb);

class OauthService {
  static createValidationCode(userId) {
    codeDb[validationCode] = userId;
    console.log("codeDb@createValidationCode:\n%o\n", codeDb);
    return validationCode;
  }

  static isValidCode(code, userId) {
    const storedId = codeDb[code];
    const isValidCode = storedId === userId;
    console.log("codeDb@isValidCode:\n%o\n", codeDb);

    if (isValidCode)
      return true;
    else
      throw new Error("invalid code");
  }

  static createAcessTokenHolder() {
    return tokenHolder;
  }
}

module.exports = OauthService;

