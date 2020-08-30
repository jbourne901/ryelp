import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from "./routes/UpdatePage";
import Home from "./routes/Home";
import {RestaurantContextProvider} from "./context/RestaurantContext";

const App = () => {
    return (
    <RestaurantContextProvider>
        <div className="container">        
            <BrowserRouter>
                <Switch>    
                    <Route exact path="/" component={Home} />
                    <Route exact path="/restaurants/:id" component={RestaurantDetailPage} />
                    <Route exact path="/restaurants/:id/update" component={UpdatePage} />
                    <Route exact path="/" component={Home} />
                </Switch>            
            </BrowserRouter>
        </div>
    </RestaurantContextProvider>
    );    
};


export default App;
