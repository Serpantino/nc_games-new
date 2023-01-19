const { ConsoleWriter } = require("istanbul-lib-report");
const {
  fetchCategories,
  fetchReviewComments,
  fetchReviews,
  fetchSingleReview,
  updateReviewVotes,
} = require("./models");

const getCategories = (request, response, next) => {
  fetchCategories()
    .then((gameCategories) => {
      response.status(200).send({ categories: gameCategories });
    })
    .catch((error) => next(error));
};

const getReviews = (request, response, next) => {
  fetchReviews()
    .then((gameReviews) => {
      response.status(200).send(gameReviews);
    })
    .catch((error) => next(error));
};

const getSingleReview = (request, response, next) => {
  return fetchSingleReview(request.params.review_id)
    .then((singleReview) => {
      response.status(200).send({ review: singleReview });
    })

    .catch((error) => next(error));
};

const getReviewComments = (request, response, next) => {
  const reviewId = request.params.review_id;

  return fetchReviewComments(reviewId)
    .then((reviewComments) => {
      response.status(200).send({ comments: reviewComments });
    })
    .catch((error) => next(error));
};

const patchReviewVoteCount = (request, response, next) => {
  
  
  return fetchSingleReview(request.params.review_id).then(() => {
    console.log("prHi");
    return updateReviewVotes(
      request.params.review_id,
      request.body.inc_votes
    ).then((updatedReview) => {

      response.status(201).send({ updatedReview });
    });
  });
};

module.exports = {
  getCategories,
  getReviews,
  getReviewComments,
  getSingleReview,
  patchReviewVoteCount,
};
