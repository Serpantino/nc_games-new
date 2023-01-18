const { ConsoleWriter } = require('istanbul-lib-report');
const { fetchCategories, fetchReviewComments, fetchReviews, fetchSingleReview } = require ('./models');



const getCategories = (request, response, next) => {
   
    fetchCategories()
    .then((gameCategories) => {

         response.status(200).send({categories: gameCategories});

    })
    .catch(error => next(error));
}



const getReviews = (request, response, next) => {
    
    fetchReviews()
    .then((gameReviews)=> {
        
        response.status(200).send(gameReviews);
    })
    .catch(error => next(error));
}



const getSingleReview = (request, response, next) => {

    fetchSingleReview(request.params)
    .then((singleReview) => {
        if(singleReview.length === 0) {
            throw(error)
        }

        response.status(200).send(singleReview);
    })
    .catch(error => next(error));
}

const getReviewComments = (request, response, next) => {

    if( isNaN(parseInt(request.params.review_id)) ) {
        
        throw(error);
    }

    fetchReviewComments(request.params)
    .then((reviewComments) => {
        
        if(reviewComments.length === 0) {

            response.status(204).send({message: 'The Selected Review currently has no comments'})
        } 
        else {

            
            response.status(200).send(reviewComments);
        }
    });
}


module.exports = {getCategories, getReviews, getReviewComments, getSingleReview};
