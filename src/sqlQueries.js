
const gameCategories = `SELECT * from categories;`;
const gameReviews = `SELECT * from reviews ORDER BY created_at DESC`;




module.exports = {gameCategories, gameReviews};