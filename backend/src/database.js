const {Pool} = require('pg');
const {db} = require('./config');
const pool = new Pool({
    user: db.user,
    password: db.passwd,
    host: db.host,
    port: db.port,
    database: db.name,
    ssl: true
})

module.exports = pool;