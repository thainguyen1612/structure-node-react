'use strict';

const User = require('../../models/user');
const { validationResult } = require('express-validator');
const { customMessageValidate } = require('../../support/helpers');

exports.index = async function (req, res) {
  try {
    let users = await User.find({});

    return res.status(200).json(users);
  } catch (err) {

    return res.status(500).json(err);
  }
};

exports.detail = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    return res.status(200).json(user);
  } catch (err) {

    return res.status(500).json(err);
  }
};

exports.store = async function (req, res) {
  const errors = validationResult(req);

  if (errors.array().length) {
    return res.status(422).json(customMessageValidate(errors));
  }
  const { email } = req.body;
  let user = await User.find({ email });

  if (user.length) {

    return res.status(422).json({ msg: 'The user already exists.' });
  }
  try {
    user = new User(req.body);
    user.save();

    return res.status(200).json({ data: { user } });
  } catch (err) {

    return res.status(500).json(err);
  }
};

exports.update = async function (req, res) {
  const errors = validationResult(req);

  if (errors.array().length) {
    return res.status(422).json(customMessageValidate(errors));
  }

  try {
    const { username, avatar } = req.body;
    await User.findByIdAndUpdate(req.params.id, { $set: { username, avatar } });

    return res.status(200).json({ msg: 'update success!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

