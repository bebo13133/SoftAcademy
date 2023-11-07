const { userModel } = require('../models/User');
const { errorHandler } = require('../utils/errorHandler');
const { ValidationError } = require('../utils/createValidationError');
const { SECRET } = process.env
const { tokenCreator } = require('../utils/tokenCreator')
const bcrypt = require('bcrypt')

const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await userModel.findOne({ email });
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return res.status(404).json({ error: 'Email or password is incorrect !' })
    }

    if (!user) {
      return res.status(404).json({ error: 'Email or password is incorrect !' })
    }

    const accessToken = await tokenCreator(user)
    const data = { _id: user._id, email: user.email, accessToken }
    res.status(200).json(data);
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
console.log(email, password, confirmPassword)
  try {

    if (password !== confirmPassword) {
      return res.status(401).json({ error: 'Passwords don`t match' })
    }

    const user = await userModel.exists({ email })

    if (user) {
      return res.status(409).json({ error: 'Email is already taken!' })
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({ email, password: hashedPass });

    const accessToken = await tokenCreator(newUser)

    const data = { _id: user._id, email: user.email, accessToken }
    // res.cookie('auth', token, { httpOnly: true })
    res.status(200).json(data);
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const logout = (req, res) => {
  res.status(200).json({ Success: 'User logged out.' })
}

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, password } = req.body;
  const data = { email, password,};

  try {
    const user = await userModel
      .findByIdAndUpdate(userId, data, { runValidators: true, new: true })
      .select('firstName lastName email imageUrl phoneNumber createdAt updatedAt');

    res.status(200).json({ user: user.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await userModel.findByIdAndUpdate(userId, { isDeleted: true });

    res.status(200).json({ userId });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getUsers = async (req, res) => {
  const page = parseInt(req?.query?.page) || 1;
  const limit = parseInt(req?.query?.limit) || 5;
  const sort = req?.query?.sort;
  const order = req?.query?.order;
  const search = req?.query?.search;
  const criteria = (req?.query?.criteria || '').trim();
  const skipIndex = (page - 1) * limit;

  const query = { isDeleted: false };
  const sortCriteria = {};

  if (sort && sort !== 'null' && order && order !== 'null') {
    sortCriteria[sort] = order;
  }

  if (search && search !== 'null' && criteria && criteria !== 'null') {
    query[criteria] = criteria == '_id' ? search : new RegExp(search, 'i');
  }

  try {
    const count = await userModel.countDocuments(query);
    let users = await userModel
      .find(query)
      .select('firstName lastName email imageUrl phoneNumber createdAt updatedAt')
      .limit(limit)
      .skip(skipIndex)
      .sort(sortCriteria)
      .lean();

    res.status(200).json({ users, count });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(200).json({ users: [], count: 0 });
    }

    errorHandler(error, res, req);
  }
};

module.exports = {
  login,
  register,
  logout,
  updateUser,
  deleteUser,
  getUsers,
};
