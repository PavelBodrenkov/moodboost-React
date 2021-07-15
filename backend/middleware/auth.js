const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/authorized-err');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // авторизационный заголовок
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    
    throw new UnauthorizedError('Необходима авторизация1');
  }
  const token = authorization.replace('Bearer ', '');

  // верификация токена
  let payload;
  
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(err.message);
  }

  // запись пейлоуда в объект запроса
  req.user = payload;
  return next();
};