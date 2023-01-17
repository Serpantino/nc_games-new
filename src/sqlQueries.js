
const sqlCategories = `SELECT * from categories;`;

const fetchReviewComments = `SELECT * FROM comments WHERE review_id = $1;`

module.exports = {sqlCategories, fetchReviewComments};