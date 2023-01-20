const db = require("../db/connection");
const sqlQueries = require("../src/sqlQueries");

function fetchCategories() {
  return db.query(sqlQueries.gameCategoriesSQL).then((gameCategories) => {
    return gameCategories.rows;
  });
}

function fetchReviews() {
  return db
    .query(sqlQueries.getAllReviewsWithCommentCountSQL)
    .then(({ rows }) => {
      return rows;
    });
}

function fetchSingleReview(id) {
  if (isNaN(parseInt(id))) {
    return Promise.reject({
      status: 400,
      message: "Bad Request, review_id must be a number",
    });
  }
  return db.query(sqlQueries.singleReviewSQL, [id]).then((review) => {
    if (review.rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: "review_id not found",
      });
    }

    return review.rows;
  });
}

function fetchReviewComments(id) {
  if (isNaN(parseInt(id))) {
    return Promise.reject({
      status: 400,
      message: "Bad Request, review_id must be a number",
    });
  }

  return fetchSingleReview(id)
    .then(() => {
      return db.query(sqlQueries.fetchReviewCommentsSQL, [id]);
    })
    .then((reviewComments) => {
      return reviewComments.rows;
    });
}

function fetchUser(username) {
  
  if(!username.username) {
  
    return Promise.reject({status: 400, message: "Invalid Key"});
  }

  return db.query(sqlQueries.fetchUserByUsernameSQL, [username.username])
  .then((user) => {

    if ((user.rows.length === 0)) {
      
      return Promise.reject({ status: 400, message: "User not found" });
    }
  
    return user.rows;
  })
}

function insertReviewComment(commentData, id) {
  
if ( typeof commentData.username !== 'string' || typeof commentData.body !== 'string'
) {
    
  return Promise.reject({status: 400, message: "Invalid data entry"});
} 

  return db.query(sqlQueries.insertReviewCommentSQL, [id, commentData.username, commentData.body])
    .then((comment) => {
      console.log('comment', comment.rows)
      return comment.rows;
    });
}

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewComments,
  fetchSingleReview,
  fetchUser,
  insertReviewComment,
};