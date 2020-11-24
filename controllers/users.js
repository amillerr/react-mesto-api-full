const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const NotFoundError = require('../errors/notfound-error');
const ConflictError = require('../errors/conflict-error');
const RequestError = require('../errors/auth-error');
const AuthError = require('../errors/auth-error');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((error) => {
      if (error.name === 'Error') {
        next(new AuthError('Неправильные почта или пароль'));
        return;
      }
      next(new RequestError('Ошибка. Повторите запрос'));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Не найден пользователь с данным id'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name = 'Жак-Ив Кусто',
    about = 'Исследователь',
    avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10, (hash) => {
    User.findOne({ email })
      .then((user) => {
        if (user) return next(new ConflictError('Пользователь с данным email уже существует'));
        return User.create({
          name, about, avatar, email, password: hash,
        })
          .then((newUser) => res.status(200).send(newUser));
      })
      .catch(next);
  });
};

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError('Не найден пользователь с данным id'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  },
  {
    new: true,
  })
    .then((user) => res.send({ data: user }))
    .catch(() => next(new RequestError('Ошибка. Повторите запрос')));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
    })
    .then((user) => res.send({ data: user }))
    .catch(() => next(new RequestError('Ошибка. Повторите запрос')));
};

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  getUser,
};
