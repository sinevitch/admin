const jwtSecret = "../config";
const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');

const authAdminSchema = new mongoose.Schema({
  token: {
    type: String,
    maxlength: 1000,
    required: true,
  },
}, {
  timestamps: true,
});

authAdminSchema.statics.generateAuthToken = async function () {
  const token = jwt.sign({ key: 'sharedKey' }, jwtSecret);
  return token;
};

authAdminSchema.statics.findBy = async (token) => {
  const result= await AuthAdmin.findOne({ token });

  if (!result) {
    throw new Error('Authorization error');
  }

  return result;
};

const AuthAdmin = mongoose.model('AuthAdmin', authAdminSchema);


module.exports = AuthAdmin;