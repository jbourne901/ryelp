import React, {useEffect} from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { useContext } from 'react';
import {RestaurantContext} from "../context/RestaurantContext";
import {useHistory} from "react-router-dom";
import StarRating from "./StarRating";
import  "./restaurant-list.css";

function RestaurantList(props) {
    const history = useHistory();    
    const {restaurants, setRestaurants, deleteRestaurant} = useContext(RestaurantContext);    
    useEffect( () => {
        const fetchData = async () => {
            try {
                console.log("fetching")
                const response = await RestaurantFinder.get("");
                console.log(response);
                setRestaurants(response.data.data.restaurant);
            } catch(err) {
                console.error(err);
            }
        };
        fetchData();        
    }, [setRestaurants]);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            console.log(`sending delete id=${id}`)
            const result = await RestaurantFinder.delete(`/${id}`);
            console.dir(result);
            deleteRestaurant(id);
        } catch(err) {
            console.error(err)
        }
    }

    const handleUpdate = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    }
    const handleView = (id) => {
        history.push(`/restaurants/${id}`);
    }
    
    const renderRating = (r) => {
        if(r.count_reviews>0) {
            return (
                <>
                    <StarRating rating = {r.avg_rating} /> 
                    <span className="text-warning">({r.count_reviews})</span>        
                </>
            );
        }
        return <span className="text-warning">0 reviews</span>;
    }

    const list = restaurants.map( r => (
            <tr key={r.id} className="restaurant-row" onClick={() => handleView(r.id)}>
                <td>{r.name}</td>
                <td>{r.location}</td>
                <td>{"$".repeat(r.price_range)}</td>
                <td>{renderRating(r)}</td>
                <td><button onClick = { (e) => handleUpdate(e, r.id) } className="btn btn-warning">Update</button></td>
                <td><button onClick = { (e) => handleDelete(e, r.id) } className="btn btn-danger">Delete</button></td>
            </tr>
        )
    );

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>                     
                    {restaurants && list}
                </tbody>
            </table>
        </div>
    );
}

export default RestaurantList;