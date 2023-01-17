


function buildNewReviewObj(reviews, comments) {
    comments.forEach(comments => {
        
        for(const review of reviews) 
        {
            if (comments.review_id === review.review_id){
                
                review.comment_count = comments.tot;
            }
        }
    })
    return reviews;
}


module.exports = {buildNewReviewObj};