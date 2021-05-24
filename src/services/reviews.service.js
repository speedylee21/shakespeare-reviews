import axios from 'axios';

const authToken = "H3TM28wjL8R4#HTnqk?c";
const apiUri = "https://shakespeare.podium.com/api/reviews"

const toReview = (item) => {
    return {
        id: item.id,
        author: item.author,
        publishDate: new Date(item.publish_date),
        rating: item.rating,
        body: item.body
    }
}

const ReviewsService = {
    getReviewById: (reviewId) => {
        return axios.get(apiUri + "/" + reviewId, {
            headers: {"x-api-key": authToken}
        })
            .then(response => response.data)
    },

    getReviews: () => {
        return axios.get(apiUri, {
            headers: {"x-api-key": authToken}
        })
            .then(response => response.data)
            .then(data => data.map(toReview));
    }
}
export default ReviewsService;