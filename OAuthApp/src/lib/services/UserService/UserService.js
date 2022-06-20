let userDb = {
  id: 1,
  username: "asuka",
  password: "letasukain"
};

class UserService {
  static getUserById(id) {
    const storedUser = id === 1 ? userDb : null;

    if (storedUser)
      return storedUser;
    else
      return null;
  }

  static createUser(id, username, password) {
    userDb = {
      id: id,
      username: username,
      password: password
    }
    return userDb;
  }
}

module.exports = UserService;

