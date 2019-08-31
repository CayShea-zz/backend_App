//*********************************************** */
//    MONGOOSE: Set up User Schema model
//  hash passwords, method for login check
//*********************************************** */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});




mongoose.model("User", userSchema);