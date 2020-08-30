import React, {useState, createContext} from 'react';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState([]);
    const addRestaurant = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    }
    const deleteRestaurant = (id) => {
        setRestaurants( restaurants.filter( r => r.id!==id ) );
    };
    const obj = {restaurants, setRestaurants, addRestaurant, deleteRestaurant, selectedRestaurant, setSelectedRestaurant};
    return (
        <RestaurantContext.Provider value={obj}>
            {props.children}
        </RestaurantContext.Provider>
    );
}
