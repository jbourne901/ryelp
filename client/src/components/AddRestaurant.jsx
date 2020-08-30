import React, {useState, useContext} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

function AddRestaurant(props) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    const {addRestaurant} = useContext(RestaurantContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await RestaurantFinder.post("", { name, location, price_range: priceRange });
            console.dir(result)
            addRestaurant(result.data.data.restaurant);
        } catch(err)     {
            console.error(err)
        }
    };

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input type="text" value={name} onChange = {(e) => setName(e.target.value)}
                           className="form-control" placeholder="Name"
                        />
                    </div>
                    <div className="col">
                        <input type="text" value={location} onChange = {(e) => setLocation(e.target.value)}
                           className="form-control" placeholder="Location"
                        />
                    </div>
                    <div className="col">
                        <select className="custom-select my-1 mr-sm-2" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                            <option disabled value="Price Range">Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={ (e) => handleSubmit(e)}>Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddRestaurant;