//*********************************************** */
//    MONGOOSE: Set up User Schema model
//  hash passwords, method for login check
//*********************************************** */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

//******************************************* */
// Hash and Salt. and then save in DB.
//*********************************************** */
// pre-save HOOK. Runs before we save user to DB. 
// NOT using arrow function because want to use keyword 'this'
userSchema.pre('save', async function(){
    const user = this;

    if (!user.isModified('password')){
        return next();
    }

    await bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return err;
        }
        bcrypt.hash(user.password, salt, function(err,hash){
            if (err){
                return err;
            }
            user.password = hash;
        });
    }); 
});


//********    Correct Password?  *********** */
// Attach a METHOD to check that password matches
// Call this method everytime a user tries to log in
userSchema.methods.checkPassword = function (userPassword) {
    //bcrypt relies on callbacks/asynch code
    return new Promise((resolve, reject) => {
        bcrypt.compare(userPassword, this.password, function(err, res){
            if (err){
                return err;
            }
            if (!res){
                return reject(false);
            }
            resolve(true);
        });
    });
};



mongoose.model("User", userSchema);