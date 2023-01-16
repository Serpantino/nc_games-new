const db = require('../db/connection');
const sqlQueries = require ('../src/sqlQueries');


function fetchCategories() {
    return db.query(sqlQueries.sqlCategories)
    .then(gameCategories => {
        return gameCategories.rows;
    });
}


module.exports = {fetchCategories};