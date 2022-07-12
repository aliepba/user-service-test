const User = require('../../models/User')

module.exports = async (req, res) => {
    const userJwt = req.user.user;

    const user = await User.findOne({_id : userJwt._id})

    if(!user) return res.status(403).json({message : 'not owner this user data'})

    return res.json({status : 'success', data : user})
    
}