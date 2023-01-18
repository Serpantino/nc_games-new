const { fetchCategories, fetchReviews, fetchSingleReview } = require ('./models');

//This requested alteration doesn't run.
const getCategories = (request, response, next) => {
   
    fetchCategories()
    .then((gameCategories) => {

         response.status(200).send({categories: gameCategories});

    })
    .catch(error => next(error));
}

const get500Error = (request, response, next) => {
    nonExistentFunc().then(foobar => {
        response.status(200).send(foobar);
    }).catch(error => next(error));
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

        response.status(200)
        .json(singleReview);
    })
    .catch(next);
}

module.exports = {getCategories, getReviews, get500Error, getSingleReview};


//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_MERGE NOTES_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
/*
    Want all instances of json replaced with get.
*/
