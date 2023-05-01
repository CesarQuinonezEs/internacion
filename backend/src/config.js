const{config} = require('dotenv')
config()

module.exports = {
    db:{
        user: process.env.DB_USER,
        passwd:  process.env.DB_PASSWD,
        host:  process.env.DB_HOST,
        port:  process.env.DB_PORT,
        name:  process.env.DB_NAME,
    }
}