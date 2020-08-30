import React, {useState, useEffect} from 'react';
import "./reviews.css";
import StarRating from "./StarRating";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from 'react-router-dom';

const Reviews = (props) => {
    const [reviews, setReviews] = useState([]);
    const id = useParams().id;
    console.log(`reviews id=${id}`)
    useEffect( () => {
        const fetchData = async () => {
            try {
                const result = await RestaurantFinder.get(`/${id}/reviews`);
                setReviews(result.data.data.reviews);
            } catch(err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    const arr = [];
    for(let r of reviews) {
        arr.push(
            <div key={r.id} className="card text-white bg-primary mb-3 mr-4 review-box">
                <div className="card-header d-flex justify-content-between">
                    <span>{r.name}</span>
                    <span><StarRating rating={r.rating} /></span>
                </div>
                <div className="card-body">
                    <p className="card-text">{r.review}</p>
                </div>
            </div>
        );
    }
    return (
        <>            
            <div className="row row-cols-3 mb-2">
                {arr}
            </div>
        </>
    );
};

export default Reviews;