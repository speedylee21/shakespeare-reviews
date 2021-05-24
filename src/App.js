import React, {useEffect, useState} from "react";

import logo from './assets/shakespeare-gets-reviewed.png';
import './App.css';
import 'react-tagsinput/react-tagsinput.css'

import ReviewsService from './services/reviews.service';

import dataUtilities from "./util/data.util";

import PieChart from "./components/pie-chart.component";
import WordCloud from "./components/word-cloud.component";
import TagList from "./components/filter-tag-list.component";

function App() {
    const [reviewsData, setReviewsData] = useState([]);

    const [filters, setFilters] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        ReviewsService.getReviews().then(data => {
            data.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
            setReviewsData(data);
            setReviews(data);
        });
    }, []);

    useEffect(() => {
        if (filters.length > 0) {
            setReviews(reviewsData.filter(r => {
                return filters.some(f => f.execute(r))
            }));
        } else {
            setReviews(reviewsData);
        }
    }, [filters, reviewsData]);

    const getWordCounts = (reviewBodies) => {
        let wordCounts = {};
        const wordsToIgnore = ["and", "is", "the", "a", "to", "it", "i", "in", "so", "as", "of", "we", "not", "be"];

        reviewBodies.forEach(reviewBody => {
            //remove punctuation and any resulting extra white space
            reviewBody = reviewBody.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

            reviewBody.split(" ").map(w => w.toLowerCase()).filter(w => wordsToIgnore.indexOf(w) < 0).forEach(word => {
                if (wordCounts[word] !== undefined) {
                    wordCounts[word] = wordCounts[word] + 1;
                } else {
                    wordCounts[word] = 1;
                }
            })
        });

        return wordCounts;
    };

    const handlePieClick = node => {
        setFilters(filters => filters.filter(f => f.property !== "rating").concat({
            execute: (review) => {
                return review.rating >= Math.floor(parseInt(node.id)) && review.rating < Math.floor(parseInt(node.id) + 1);
            },
            property: "rating",
            display: "Rating = " + node.id
        }))
    };

    const handleWordClick = (word) => {
        setFilters(filters.filter(f => f.property !== "body").concat({
            execute: (review) => {
                return review.body.toLowerCase().indexOf(word.value) >= 0;
            },
            property: "body",
            display: "Body contains \"" + word.value + "\""
        }));
        return false;
    };

    const handleFiltersChange = (tags, changedTags, changedIndexes) => {
        changedIndexes.forEach(idxChanged => {
            setFilters(filters.filter((f, idx) => idx !== idxChanged));
        });
    }

    return (
        <div className="shakespeare-app">
            <h1 className="heading">
                <img src={logo} alt="Shakespeare Gets Reviewed"/>
            </h1>
            <div className="container">
                <div className="item">
                    <div className="block review-ratings-pie">
                        <h2>Reviews by Rating</h2>
                        <p>Click on a pie piece to filter reviews by that rating.</p>
                        <PieChart data={dataUtilities.groupBy(reviewsData, r => Math.floor(r.rating))} onClick={handlePieClick}/>
                    </div>
                </div>

                <div className="item">
                    <div className="block review-tag-cloud">
                        <h2>Words in Reviews</h2>
                        <p>Click on a word to show reviews that contain that word.</p>
                        <WordCloud
                            onClick={handleWordClick}
                            data={getWordCounts(reviewsData.map(d => d.body))} />
                    </div>
                </div>

                <div className="review-filter item-center">
                    <div className="block">
                        <h2>Filters</h2>
                        {filters.length > 0
                            ? <TagList tags={filters.map(f => f.display)} onChange={handleFiltersChange} />
                            : <p>No filters: Showing all reviews</p>
                        }
                    </div>
                    <div className="block">
                        <h2>Reviews ({reviews.length} matching)</h2>
                        <ul className="reviews-list">
                            {reviews.map(r =>
                                <li key={r.id}>
                                    <div className={`rating-${Math.floor(r.rating)}`}>{r.rating}</div>
                                    <h3>{r.author} <span>on {r.publishDate.toLocaleString()}</span></h3>
                                    <p>{r.body}</p>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
