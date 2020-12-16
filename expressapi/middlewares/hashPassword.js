import { hash } from 'bcrypt';

const hashPassword = async (req, res, next) => {
  const SALT_ROUNDS = 10;
  const hashedPassword = await hash(req.body.password, SALT_ROUNDS);

  req.hashedPassword = hashedPassword;

  next();
};

export default hashPassword;
