const jwt         = require('jsonwebtoken');
const Admin       = require('../../models/admin');
const constants   = require('../../../config/constants');
const { encryptPassword } = require('../../services/authService');
const privateKey = process.env.SERVER_JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    const passwordHash = encryptPassword(password, admin.salt);
  
    if (passwordHash != admin.password_hash) {
      return res.status(401).json({ msg: 'Unauthorized!'});
    }
    
    const token = await jwt.sign({admin}, privateKey, { expiresIn: constants.JWT_EXPIRES_IN });

    return res.status(200).json({
      msg: 'success',
      _token: token
    });
  } catch (error) {

    return res.status(500).json(error);
  }
};