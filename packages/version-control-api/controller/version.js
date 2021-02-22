'use strict';

const { Pool } = require('pg');

function ApiError(code, msg) {
  const e = new Error(msg);
  e.code = code;
  return e;
}

let pgPool;

module.exports = {
  async getPool() {
    if (!pgPool) {
      pgPool = new Pool({
        connectionString: 'postgresql://tencentdb_8ygfbnqf:ib4%7C0)DS6%24CldO1@10.0.0.7:5432/tencentdb_8ygfbnqf\n',
      });
      // init table
      await pgPool.query(`CREATE TABLE IF NOT EXISTS versions (
        ID       SERIAL PRIMARY      KEY,
        VERSION           TEXT         NOT NULL,
        URL          CHAR(50)     NOT NULL
      );`);
      return pgPool;
    } else {
      return pgPool;
    }
  },
  async getVersionList() {
    const pool = await this.getPool();
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'select * from versions',
    });
    await client.end();
    return rows;
  },
  async addVersion(versionInfo) {
    const pool = await this.getPool();
    const { version, url } = versionInfo;
    const deleteWhiteOfVersion = version.trim()
    const deleteWhiteOfUrl = url.trim()
    const existVersion = await this.getVersion(deleteWhiteOfVersion);
    if (existVersion) {
      throw new ApiError(1000, `Version ${deleteWhiteOfVersion} exist.`);
    }
    const client = await pool.connect();
    const { rowCount } = await client.query({
      text: 'INSERT INTO versions(version, url) VALUES($1, $2)',
      values: [deleteWhiteOfVersion, deleteWhiteOfUrl],
    });
    await client.end();
    return rowCount === 1;
  },
  async getVersion(version) {
    try {
      const pool = await this.getPool();
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'SELECT * FROM versions WHERE version = $1',
        values: [version],
      });
      await client.end();
      if (rows.length > 0) {
        return rows;
      }
      return false;
    } catch (e) {
      throw new ApiError(1001, e);
    }
  },
  async getUrlByVersion(version){
    try{
      const pool = await this.getPool();
      const client = await pool.connect();
      const { rows } = await client.query({
        text: 'SELECT URL FROM versions WHERE version = $1',
        values: [version],
      });
      await client.end();
      return rows;
    }catch (e) {
      throw new ApiError(1001, e);
    }
  },
  async deleteVersion(version) {
    const pool = await this.getPool();
    const client = await pool.connect();
    const { rows } = await client.query({
      text: 'DELETE FROM versions WHERE version = $1',
      values: [version],
    });
    await client.end();
    return rows;
  },
};

