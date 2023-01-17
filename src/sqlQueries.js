
const gameCategories = `SELECT * FROM categories;`;
const gameReviews = `SELECT * FROM reviews ORDER BY created_at DESC;`;
const reviewComments = `SELECT * FROM comments`
const reviewCommentCount = `
SELECT reviews.review_id, (SELECT COUNT (review_id) FROM comments WHERE comments.review_id = reviews.review_id) AS TOT FROM reviews;`

const fetchReviewComments = `SELECT * FROM comments WHERE review_id = $1;`

module.exports = {gameCategories, gameReviews, reviewComments, reviewCommentCount, fetchReviewComments};
