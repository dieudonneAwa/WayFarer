import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/userModel';

async function loginById(userId) {
  const user = await User.findById(userId);

  const loginUser = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    is_admin: user.is_admin,
  };
  const token = jwt.sign(loginUser, 'process.env.JWT_SECRET', '');
  loginUser.token = token;
  return loginUser;
}

export default {
  async login(req, res) {
    const { email, password } = req.body;
    const rows = await User.find({ email });
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ errors: { global: 'Wrong credentials' } });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const { token } = await loginById(user.id);
      user.token = token;
      return res.status(200).send({ status: 'Success', data: user });
    }
    return res.status(400).json({ errors: { global: 'Wrong credentials' } });
  },
};
