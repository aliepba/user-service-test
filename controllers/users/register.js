const bcrypt = require('bcrypt')
const User = require('../../models/User')
const Validator = require('fastest-validator')
const v = new Validator()


module.exports = async (req, res) => {
    const {fullname, username, email} = req.body;
    const validation = {
        fullname : 'string|empty:false',
        username : 'string|max:15|empty:false',
        email : 'email|empty:false',
        password : 'string|min:6|empty:false' 
    }

    const validate = v.validate(req.body, validation)

    if(validate.length) return res.status(400).send({message : 'invalid request' ,message: validate})

    const user = await User.findOne({email : email});

    if(user !== null){
        if(user.username == username) return res.status(409).send({message : 'username already exists'})
        if(user.email == email) return res.status(409).send({message : 'email already exists'})
    }

    const password = await bcrypt.hash(req.body.password, 10)

    const data = {
        fullname,
        password,
        username,
        email,
      };

    const newUser = await User.create(data)

    return res.json({
        status : 'success',
        data : {
            id : newUser._id,
        }
    })

}

