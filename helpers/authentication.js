import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Authentication = {
  /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
     * comparePassword
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
     * Gnerate Token
     * @param {string} id
     * @returns {string} token
     */
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.PRIVATE_KEY, { expiresIn: '2d' });
    return token;
  },
};
export default Authentication;
