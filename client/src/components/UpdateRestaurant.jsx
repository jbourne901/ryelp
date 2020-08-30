import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

function UpdateRestaurant(props) {
    const id  = useParams().id;
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const history = useHistory();
    console.log(`update id=${id}`)
    useEffect( () => {
        const fetchData = async () => {
            try {
                const result = await RestaurantFinder.get(`/${id}`);
                const p = result.data.data.restaurant;
                setName(p.name);
                setLocation(p.location);
                setPriceRange(p.price_range);
            } catch(err) {
                console.error(err);
            }            
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await RestaurantFinder.put("", {id, name, location, price_range: priceRange});
            console.dir(result);
            history.push("/");
        } catch(err) {
            console.error(err);
        }
    }
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" value={name} onChange = {(e) => setName(e.target.value)}
                        name="name" id="name" className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location"></label>
                    <input type="text" value={location} onChange = {(e) => setLocation(e.target.value)}
                       name="location" id="location" className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priceRange"></label>
                    <select value={priceRange} onChange = {(e) => setPriceRange(e.target.value)}
                         className="custom-select my-1 mr-sm-2"                           
                    >
                            <option disabled value="Price Range">Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}

export default UpdateRestaurant;