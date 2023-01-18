const { fetchCategories, fetchReviews, fetchSingleReview } = require ('./models');


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

module.exports = {getCategories, getReviews, getSingleReview};


//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_MERGE NOTES_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
/*
    Removed get500Error as it gets overridden by 400.
*/
