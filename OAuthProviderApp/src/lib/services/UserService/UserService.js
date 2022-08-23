let userDb = {
  id: 1,
  username: "myusername",
  password: "mypassword"
};

class UserService {
  getUserById(id) {
    const foundUser = id === 1 ? userDb : null;

    if (foundUser) {
      return {
        id: userDb.id,
        username: userDb.username
      }
    }
    else
      return null;
  }

  getUser(username, password) {
    const foundUser = username === "myusername" ? userDb : null;

    if (password === foundUser.password) {
      return {
        id: userDb.id,
        username: userDb.username
      }
    }
    else
      return null;
  }
}

module.exports = UserService;

