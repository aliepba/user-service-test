const User = require('../../models/User')
const RefreshToken = require('../../models/RefreshToken')

module.exports = async (req, res) => {
    const userId = req.body.user_id
    const user = await User.findOne({_id : userId});

    if(!user) return res.status(404).json({status: 'error', message: 'user not found'})

    const token = await RefreshToken.findOne({
        userId : userId
    })

    await token.remove()

    return res.json({
        status : 'success',
        message : 'Success logout'
    })
}