const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // проверяем, есть ли токен в куках
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация. Не передан токен'));
  }

  const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', (err, decoded) => {
    if (err) {
      return next(new UnauthorizedError('Необходима авторизация. Ошибка проверки токена'));
    }
    return decoded;
  });

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
