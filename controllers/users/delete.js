const User = require("../../models/User");

module.exports = async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({
        _id : id
    })

    if(user == null) return res.status(404).json({message : 'User not found'})

    await user.remove()

    return res.json({status : 'success', message: 'User deleted'})
}