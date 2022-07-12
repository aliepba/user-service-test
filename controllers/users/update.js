const bcrypt = require('bcrypt');
const User = require('../../models/User');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const id = req.params.id;
    const {fullname, username, email, password} = req.body;
    const user = await User.findOne({_id : id});

    const validation = {
        fullname : 'string|empty:false',
        username : 'string|max:15|empty:false',
        email : 'email|empty:false',
        password : 'string|min:6|empty:false' 
    }
    
    const validate = v.validate(req.body, validation)
    if(validate.length) return res.status(400).json({message : 'Invalid request', errors : validate})
    

    if(!user) return res.status(404).json({status: 'error', message: 'user not found'})
    if(user.email === email) return res.status(409).json({message : 'Email already exists'})

    const passwordHash = await bcrypt.hash(password, 10);

    user.fullname = fullname; 
    user.username = username;
    user.email = email;
    user.password = passwordHash;
    await user.save();

    return res.json({
        status : 'success',
        data :  {
            id: user.id,
            fullname,
            username,
            email
        }
    })
}