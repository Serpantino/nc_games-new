const Router = require('express');
const {getCategories, getReviewComments, getReviews} = require('./controllers');
const router = new Router();

router.get('/', (request, response) => {
    response.status(200).send(
        `Welcome to the Board Games API.`
    )
});

router.get('/categories', getCategories);

router.get('/reviews', getReviews);


router.get('/reviews/:review_id/comments', getReviewComments);

module.exports = router;