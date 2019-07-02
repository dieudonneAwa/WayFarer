import uuid from 'uuid';

class User {
  /**
   * class constructor
   * @param data
   */
  constructor() {
    this.users = [];
  }
  /**
   * @param {object} user object
   */
  save(data) {
    const newUser = {
      id: uuid.v4(),
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      password: data.password,
      is_admin: data.is_admin,
    };
    this.users.push(newUser);
    return newUser;
  }
  /**
   * @param {uuid} id
   * @param {object} user object
   */
  getUser(id) {
    return this.users.find(user => user.id === id); 
  }
  /**
   * @param {object} return all users
   */
  getUsers() {
    return this.users;
  }
  /**
   * @param {uuid} id
   * @param {object} data
   */
  updateUser(id, data) {
    this.users.forEach((user, index) => {
      if (user.id === id) {
        this.users[index] = {
          id: user.id,
          first_name: data.first_name || user.first_name,
          last_name: data.last_name || user.last_name,
          username: data.username || user.username,
          email: data.email || user.email,
          password: data.password || user.password,
          is_admin: data.is_admin || user.is_admin,
        };
      }
    });
    return this.users.find(user => user.id === id);
  }
  /**
   * @param id
   */
  deleteUser(id) {
    this.users.forEach((user) => {
      if (user.id === id) {
        this.users.splice(id, 1);
      }
      return {};
    });
  }
}

export default new User();
