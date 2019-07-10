import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
  async signUp(req, res) {
    try {
      const user = new User(req.body);
      user.password = bcrypt.hashSync(req.body.password, 10);
      const newUser = await user.save();

      const token = await loginById(newUser.id);
      return res.status(200).json({ status: 'Success', data: token });
    } catch (error) {
      console.log(error);
    }
  },

};
