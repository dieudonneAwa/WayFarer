import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel';

const loginById = async (userId) => {
  const user = await User.findById(userId);

  const loginUser = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    is_admin: user.is_admin,
  };
  const token = jwt.sign(loginUser, process.env.JWT_SECRET, '');
  return token;
};

export default {
  async signUp(req, res) {
    const user = new User(req.body);

    try {
      const userPassword = await req.body.password;
      user.password = await bcrypt.hashSync(userPassword, 10);
      const newUser = await user.save();

      const token = await loginById(newUser.id);
      newUser.token = token;
      return res.status(200).json({ status: 'Success', data: newUser });
    } catch (error) {
      return res.status(500).json({ status: 'error', error });
    }
  },

};
