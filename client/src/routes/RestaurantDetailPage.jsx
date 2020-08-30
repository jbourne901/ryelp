import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';


const RestaurantDetailPage = () => {
    const id  = useParams().id;    
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext);

    useEffect( () => {
        const fetchData = async () => {
            try {
                const result = await RestaurantFinder.get(`/${id}`);
                setSelectedRestaurant(result.data.data.restaurant);
            } catch(err)          {
                console.error(err);
            }            
        };
        fetchData();
    }, [setSelectedRestaurant, id]);
    return (
        <div>
            {selectedRestaurant && 
                <>
                    <h1 className="text-center display-1">{selectedRestaurant.name}</h1>
                    <div className = "text-center">
                        <StarRating rating = {selectedRestaurant.avg_rating} /> 
                        <span className="text-warning">({selectedRestaurant.count_reviews})</span>
                    </div>                    
                    <div className="mt-3">
                        <Reviews restaurant={selectedRestaurant.id}/>
                    </div> 
                    <AddReview id={selectedRestaurant.id}/>
                </>
            }
        </div>
    );
};

export default RestaurantDetailPage;