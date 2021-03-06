'use strict';

const Admin = require('../../models/admin');
const { validationResult } = require('express-validator');
const { customMessageValidate } = require('../../support/helpers');
const { encryptPassword, makeSalt } = require('../../services/admin/authService');
const logInfo = require('../../logger/logInfo');
const logError = require('../../logger/logError');

exports.store = async (req, res) => {
  try {
    //write Log info
    logInfo.info(req);

    const errors = validationResult(req);

    if (errors.array().length) {
      return res.status(422).json(customMessageValidate(errors));
    }

    const { email, password } = req.body;
    const admin = await Admin.find({ email });

    if (admin.length) {
      return res.status(422).json({ msg: 'The admin already exists.' });
    }

    const salt = makeSalt();
    const passwordHash = encryptPassword(password, salt);
    const params = {
      email: email,
      password_hash: passwordHash,
      salt: salt
    };
    const adminCreate = new Admin(params);
    adminCreate.save();

    return res.status(200).json({ data: { adminCreate } });
  } catch (err) {
    //write Log info
    logError.error(err);

    return res.status(500).json(err);
  }
};
