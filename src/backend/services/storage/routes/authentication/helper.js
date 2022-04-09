/**Taken from:
 * https://www.codementor.io/@olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-postgresql-db-and-jwt-3-mke10c5c5
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(usersPassword) {
    return bcrypt.hashSync(usersPassword, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} usersPasswords
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, usersPasswords) {
    return bcrypt.compareSync(usersPasswords, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} usersEmail
   * @returns {Boolean} True or False
   */
  isValidEmail(usersEmail) {
    return /\S+@\S+\.\S+/.test(usersEmail);
  },
  /**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(idUsers) {
    const token = jwt.sign(
      {
        userId: idUsers,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );
    return token;
  },
};

//export default Helper;
module.exports = Helper;
