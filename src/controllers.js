const { fetchCategories } = require ('./models');

//This requested alteration doesn't run.
const getCategories = (request, response, next) => {
   
    fetchCategories()
    .then((gameCategories) => {

         response.status(200).json(gameCategories);

    }).catch(next);
}

module.exports = {getCategories};