const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const deleteUser = require('./delete');
const updateUser = require('./update');
const profile = require('./profile');
const getUsers = require('./getUsers');

module.exports = {
    register,
    login,
    logout, 
    deleteUser,
    updateUser,
    profile,
    getUsers
}