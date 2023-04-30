const {Pool} = require('pg');

const pool = new Pool({
    user: 'cesar',
    password: '3ueyM0SjjGHQBtvj4kaVMnhf13B3VlOy',
    host: 'dpg-ch72qbak728iqr2b4gb0-a.oregon-postgres.render.com',
    port: 5432,
    database: 'interna'
})

module.exports = pool;