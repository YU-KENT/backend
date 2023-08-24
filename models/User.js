const moogoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = moogoose.Schema({
    email:{type:String, require: true, unique: true},
    password:{type:String, require: true,}
})

userSchema.plugin(uniqueValidator);

module.exports = moogoose.model('User',userSchema);