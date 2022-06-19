class UserService {
  static getUserById(id) {
    if (id === "1")
      return { id: "1", username: "asuka", password: "letasukain" };
    else
      return null;
  }
}

module.exports = UserService;

