class UserService {
  static getUserById(id) {
    if (id === "1")
      return { id: "1", username: "asuka", password: "letasukain" };
    else
      return null;
  }

  static getUser(username, password) {
    if (username === "asuka" && password === "letasukain")
      return { id: "1", username, password };
    else
      return null;
  }
}

module.exports = UserService;

