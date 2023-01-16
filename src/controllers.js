const pool = require('../db/connection');
const sqlQueries = require ('../src/sqlQueries');

function getCategories(request, response) {
    pool.query(sqlQueries.sqlCategories, (error, categoryList) => {

        try {
            
            response.status(200).json(categoryList.rows);

        } catch {
            console.error('error:', error);
            throw error;
        }
    })
}

module.exports = {getCategories};