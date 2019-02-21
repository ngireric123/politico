
import bcrypt from 'bcrypt';
import pool from './db';

class CreateUser {
  // check existingemail
  constructor() {
    pool.query('SELECT * FROM users', (error, res) => {
      const row = res.rows;
      this.users = row;
      // this.users = res.rowCount;
    });
  }

  check(email) {
    const user = this.users.find(oldEmail => oldEmail.email === email);
    return user;
  }


  async addUser(data) {
    this.salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(data.password, this.salt);
    this.newUser = [
      data.firstName,
      data.lastName,
      data.otherName,
      data.email,
      data.phoneNumber,
      this.password,
      data.passportUrl,
    ];
    pool.query(`INSERT INTO
      users(
      "firstName",
      "lastName",
      "otherName",
      email,
      "phoneNumber",
      password,
      "passportUrl"
      )
      VALUES($1, $2, $3, $4, $5, $6, $7)
    `, this.newUser);
    this.users.push(data);
  }
}

export default new CreateUser();
