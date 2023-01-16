
const gameCategories = `SELECT * FROM categories;`;
const gameReviews = `SELECT * FROM reviews ORDER BY created_at DESC;`;
const reviewComments = `SELECT * FROM comments`



module.exports = {gameCategories, gameReviews, reviewComments};