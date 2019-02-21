import pool from './db';

class Parties {
  async createParty(data) {
    this.newParty = [
      data.name,
      data.hqAddress,
      data.logoUrl,
    ];

    this.res = await pool.query('INSERT INTO party ("name", "hqAddress", "logoUrl") VALUES($1, $2, $3) RETURNING *', this.newParty);
    return [this.res.rows[0]];
  }

  async checkp(name) {
    this.res = await pool.query('SELECT * FROM party  WHERE name = $1', [name]);
    if (this.res.rowCount < 1) {
      return true;
    }
    return false;
  }


  async getAll() {
    this.res = await pool.query('SELECT * FROM party');
    return this.res.rows;
  }

  // get one party method
  async getOneParty(id) {
    this.party = [];
    this.res = await pool.query('SELECT * FROM party WHERE id = $1', [id]);
    if (this.res.rowCount < 1) {
      this.party.push(this.res.rows[0]);
    }
    return this.party;
  }

  // delete models
  async deleteParty(id) {
    this.newId = parseInt(id, 10);
    await pool.query('DELETE FROM party WHERE id = $1', [this.newId]);
  }
}
export default new Parties();
