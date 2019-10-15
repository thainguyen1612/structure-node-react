const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const configAuth = require('../../../config/auth');
const constants = require('../../../config/constants');
const Admin = require('../../models/admin');

exports.encryptPassword = (password, salt) => {
  const passwordHash = crypto.createHmac('sha256', salt.toString()).update(password).digest('hex');

  return passwordHash;
};

exports.makeSalt = () => {
  return Math.round(new Date().valueOf() * Math.random());
};

exports.generateToken = async (auth) => {
  try {
    const token = await jwt.sign({ rule: constants.IS_ADMIN }, configAuth.SERVER_JWT_SECRET_ADMIN, { expiresIn: configAuth.JWT_EXPIRES_IN });
    const refreshToken  = await jwt.sign({ rule: constants.IS_ADMIN, _id: auth._id }, configAuth.SERVER_JWT_SECRET_REFRESH_ADMIN, { expiresIn: configAuth.JWT_REFRESH_EXPIRES_IN });

    return { token: token, refresh_token: refreshToken };
  } catch (err) {
    throw new Error(err);
  }
};

exports.getTokenByRefreshToken = async (refreshToken) => {
  try {
      const decoded = await jwt.verify(refreshToken, configAuth.SERVER_JWT_SECRET_REFRESH_ADMIN);
      if (!decoded || decoded.rule != constants.IS_ADMIN) {
        throw new Error({ msg:'Unauthorized' });
      }

      const admin = await Admin.findById(decoded._id);
      const listRefreshToken = admin.refresh_token;

      if (!listRefreshToken.includes(refreshToken)) {
        throw new Error({ msg:'Unauthorized' });
      }

      const token = await jwt.sign({ rule: constants.IS_ADMIN }, configAuth.SERVER_JWT_SECRET_ADMIN, { expiresIn: configAuth.JWT_EXPIRES_IN });

      return token;
  } catch (error) {
    throw new Error(error);
  }
}
