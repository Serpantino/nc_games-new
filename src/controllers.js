const { fetchCategories, fetchReviews } = require ('./models');

//This requested alteration doesn't run.
const getCategories = (request, response, next) => {
   
    fetchCategories()
    .then((gameCategories) => {

         response.status(200).json(gameCategories);

    })
    .catch(next);
}


const getReviews = (request, response, next) => {

    fetchReviews()
    .then((gameReviews)=> {
        
        response.status(200).json(gameReviews);
    })
    .catch(next);
}

module.exports = {getCategories, getReviews};