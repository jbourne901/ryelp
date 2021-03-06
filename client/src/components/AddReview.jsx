import React, {useState} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useHistory, useLocation } from 'react-router-dom';

function AddReview(props) {
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("");
    const history = useHistory();
    const location = useLocation();

    const id = props.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await RestaurantFinder.post(`/${id}/reviews`, { name, review: reviewText, rating});
            console.dir(result); 
            history.push("/");
            history.push(location.pathname);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control"/>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={(e)=>setRating(e.target.value)} name="rating" id="rating" className="custom-select">
                            <option disabled value="Rating">Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea value={reviewText}  onChange={(e)=>setReviewText(e.target.value)} name="review" id="review" className="form-control">

                    </textarea>                    
                </div>
                <button onClick={(e) => handleSubmit(e)} className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddReview;