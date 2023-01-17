const { fetchCategories, fetchReviewComments } = require ('./models');

//This requested alteration doesn't run.
const getCategories = (request, response, next) => {
   
    fetchCategories()
    .then((gameCategories) => {

         response.status(200).json(gameCategories);

    }).catch(next);
}

const getReviewComments = (request, response, next) => {

    fetchReviewComments(request.params)
    .then((reviewComments) => {

        response.status(200).json(reviewComments);
    })
}

module.exports = {getCategories, getReviewComments};