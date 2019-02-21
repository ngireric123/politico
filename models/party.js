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


  // party update
  async PartyUpdate(id, data, party) {
    const newName = data.name || party[0].name;
    const newHqAddress = data.hqAddress || party[0].hqAddress;
    const newLogoUrl = data.logoUrl || party[0].logoUrl;
    this.newId = parseInt(id, 10);
    this.newData = [
      newName,
      newHqAddress,
      newLogoUrl,
      this.newId,
    ];
    this.res = await pool.query('UPDATE party SET name = $1, "hqAddress" = $2, "logoUrl" = $3 WHERE id = $4 RETURNING *', this.newData);
    return [this.res.rows[0]];
  }

  // get one party method
  async getOneParty(id) {
    this.res = await pool.query('SELECT * FROM party WHERE id = $1', [id]);
    return this.res;
  }

  // delete models
  async deleteParty(id) {
    this.newId = parseInt(id, 10);
    await pool.query('DELETE FROM party WHERE id = $1', [this.newId]);
  }
}
export default new Parties();
