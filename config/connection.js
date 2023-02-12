const pgPromise = require ('pg-promise')
const config = {

    host : 'recipes.cyv3yawy08ky.us-east-1.rds.amazonaws.com',
    port : '5432',
    database: 'renta_bd',
    user:'scorpiondb',
    password: 'Scorpion246'

}

const pgp = pgPromise({})
const db = pgp(config)

exports.db = db 