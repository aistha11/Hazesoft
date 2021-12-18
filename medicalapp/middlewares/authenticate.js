import { verify } from 'jsonwebtoken';
import createError from '../utils/createError';

export default async function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.authenticatedUserID = decoded.id;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(createError(401, 'Logged Out'));
    } else if (error.name === 'JsonWebTokenError') {
      next(createError(401, 'User not logged in'));
    } else {
      next(error);
    }
  }
  next();
}
