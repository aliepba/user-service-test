const bcrypt = require('bcrypt')
const User = require('../../models/User')
const RefreshToken = require('../../models/RefreshToken')
const Validator = require('fastest-validator')
const jwt = require('jsonwebtoken');
const v = new Validator();
const {JWT_SECRET, JWT_SECRET_REFRESH_TOKEN, JWT_ACCESS_TOKEN_EXPIRED, JWT_REFRESH_TOKEN_EXPIRED} = process.env;

module.exports = async(req, res) => {
    const {username, password} = req.body;
    const schema = {
        username: 'string|empty:false',
        password: 'string|empty:false'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) return res.status(400).json({message : 'Invalid request',errors : validate})

    const user = await User.findOne({username : username});
    if (!user) return res.status(404).json({status: 'error', message: 'user not found'});


    const PasswordValid = await bcrypt.compare(password, user.password);
    if(!PasswordValid) return res.status(404).json({status: 'error', message: 'password is wrong'});
    
    const token = jwt.sign({user}, JWT_SECRET, {expiresIn:JWT_ACCESS_TOKEN_EXPIRED})
    const refreshToken = jwt.sign({user}, JWT_SECRET_REFRESH_TOKEN, {expiresIn:JWT_REFRESH_TOKEN_EXPIRED})

    await RefreshToken.create({
        refreshToken : refreshToken,
        userId : user._id
    })


    res.json({
        status : 'success',
        data : {
           token,
           refresh_token : refreshToken
        }
    })
}