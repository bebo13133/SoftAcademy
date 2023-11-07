const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {

    email: {
      type: String,
      required: true,
      // match: [/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/, 'Email is not valid!'],
    },
    password: {
      type: String,
      required: true,
    },
 
  },
);

const userModel = model('User', userSchema);

module.exports = {
  userModel,
};
