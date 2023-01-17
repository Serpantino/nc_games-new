const { fetchCategories, fetchReviewComments, fetchReviews } = require ('./models');


//This requested alteration doesn't run.
const getCategories = (request, response, next) => {
   
    fetchCategories()
    .then((gameCategories) => {

         response.status(200).json(gameCategories);

    })
    .catch(next);
}

const getReviewComments = (request, response, next) => {

    fetchReviewComments(request.params)
    .then((reviewComments) => {

        response.status(200).json(reviewComments);
    })
}


const getReviews = (request, response, next) => {
    
    fetchReviews()
    .then((gameReviews)=> {
        
        response.status(200).json(gameReviews);
    })
    .catch(next);
}

module.exports = {getCategories, getReviews, getReviewComments};

