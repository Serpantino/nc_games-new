const {Router} = require('express');
const {getCategories, getReviews, getSingleReview, getReviewComments} = require('./controllers');
const router = new Router();

router.get('/', (request, response) => {
    response.status(200).send(
        `Welcome to the Board Games API.`
    )
});

router.get('/categories', getCategories);

router.get('/reviews', getReviews);


router.get('/reviews/:review_id', getSingleReview);

router.route('/reviews/:review_id/comments').get(getReviewComments);

module.exports = router;

