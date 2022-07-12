const RefreshToken = require('../../models/RefreshToken')
const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const v = new Validator();
const {
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED
  } = process.env;

module.exports = async (req, res) => {
    const username = req.body.username;
    const refreshToken = req.body.refresh_token;

    const validation = {
        username : 'string|empty:false',
        refresh_token : 'string|empty:false',
    }

    const validate = v.validate(req.body, validation)

    if(validate.length) return res.status(400).send({message : 'invalid request' ,message: validate})

    if(!refreshToken || !username) return res.status(400).json({status : 'error', message : 'invalid token'})

    await RefreshToken.findOne({
        refreshToken : refreshToken
    })

    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
        if(err) return res.status(403).json({status : 'error', message : err.message})
        if(username !== decoded.user.username) return res.status(400).json({status : 'error', message : 'email is not valid'})

        const token = jwt.sign({ data: decoded.user }, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED });

        return res.json({
            status: 'success',
            data: {
              token
            }
          });
    })
}