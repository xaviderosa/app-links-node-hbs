const mysql = require('mysql');

const {promisify} = require('util');

const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection ((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ERR_CON_COUNT_ERROR') {
            console.error('DATABASEA HAS TO MANY CONNECTION');
        }
        if(err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WSA REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB IS CONECTED');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;