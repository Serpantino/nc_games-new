const db = require('../db/connection');
const sqlQueries = require ('../src/sqlQueries');


function fetchCategories() {
    return db.query(sqlQueries.gameCategories)
    .then(gameCategories => {
        return gameCategories.rows;
    });
}

function fetchReviews() {

    return db.query(sqlQueries.gameReviews)
    .then(gameReviews => {
        //This might be backwards (comments > review)
        db.query(sqlQueries.reviewComments)
        .then((comments) => {   //This would be better in a util func
            
            for(const comment of comments.rows) {
                let comments = 0;
                for(const review of gameReviews.rows) {
                    console.log('review_id',review.review_id);
                    console.log('comment rev_id',comment.review_id);
                    if(comment.review_id === review.review_id) {
                        console.log('Go Fish')
                        comments++;
                    }
                    // console.log('comments', comments)
    
                    return review.comment_count += comments;
                };

            }
        })
        
        return gameReviews.rows;
    })


}


module.exports = {fetchCategories, fetchReviews};