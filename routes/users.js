const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');
const verifyToken = require('../middleware/verifyToken');
const permission = require('../middleware/permission');

/* GET users listing. */
router.post('/create',verifyToken, permission('admin') ,userController.register)
router.post('/login', userController.login)
router.post('/logout', verifyToken ,userController.logout)
router.delete('/delete/:id', verifyToken , permission('admin'),userController.deleteUser)
router.put('/update/:id', verifyToken , permission('admin')  ,userController.updateUser)
router.get('/', verifyToken , permission('admin') ,userController.getUsers)
router.get('/profile', verifyToken ,userController.profile)

module.exports = router;
