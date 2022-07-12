const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
    refreshToken : {
        type : String,
        required : true
    },
    userId : {
        type : ObjectId,
        ref : 'User'
    }
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)