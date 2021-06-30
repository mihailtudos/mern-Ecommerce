import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

//function to check if the passwords match (used for login in)
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

//run password encryption before registering new user (upon save  method)
userSchema.pre('save', async function(next){
  //only run when the password is created not modified (to avoid password double hashing)
  if (!this.isModified('password')) {
    next();
  }

  //creating the salt level
  const salt = await bcrypt.genSalt(10);
  //encrypting the password with the proposed salt
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

export default User;