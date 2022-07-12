const User = require('../../models/User')

module.exports = async (req, res) => {
    const users = await User.find();

    return res.json({
        status : 'success',
        data : users
    })
}