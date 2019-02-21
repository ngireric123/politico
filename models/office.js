import pool from './db';

class Office {
  async postOffice(data) {
    this.newOffice = [
      data.type,
      data.name,
    ];
    this.res = await pool.query('INSERT INTO office ("type", "name") VALUES($1, $2) RETURNING *', this.newOffice);
    return [this.res.rows[0]];
  }

  async officeCheck(name) {
    this.result = [];
    this.res = await pool.query('SELECT * FROM office WHERE name = $1', [name]);
    if (this.res.rowCount < 1) {
      this.office = [this.res.rows[0]];
    }
    return this.result;
  }
}

export default new Office();
