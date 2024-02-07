const bcrypt = require('bcrypt');


const users = [
  { id: 1, username: 'user1', passwordHash: bcrypt.hashSync('password1', 10) },
  { id: 2, username: 'user2', passwordHash: bcrypt.hashSync('password2', 10) },
  // Add more user data as needed
];

const getUserById = (userId) => {
  const user = users.find(user => user.id === userId);
  return user ? { ...user, password: undefined } : null;
};

const getUserByUsername = (username) => {
  const user = users.find(user => user.username === username);
  return user ? { ...user, password: undefined } : null;
};

const validatePassword = (username, password) => {
  const user = getUserByUsername(username);
  return user && bcrypt.compareSync(password, user.passwordHash);
};

module.exports = { getUserById, getUserByUsername, validatePassword };
