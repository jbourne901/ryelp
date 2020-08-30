const express = require('express');
require("dotenv").config();
const morgan = require("morgan");
const db = require("./db");
const cors = require("cors");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT || 3005;
const host = process.env.HOST;
app.listen(port, host, () => {
    console.log('listening');    
});

app.get("/api/v1/restaurants", async (req, res) => {
    console.log("list restaurants");
    try {
        const results = await db.query("select r.*, (select count(*) from reviews v where v.restaurant_id=r.id) as count_reviews, (select trunc(avg(v.rating),1) from reviews v where v.restaurant_id=r.id) as avg_rating from restaurants r");
        console.dir(results)
        res.status(200).json({
                           status: "success",
                           results: results.rows.length,
                           data: {
                                    restaurant: results.rows
                           }
                        });
    } catch(err) {
        console.error(err);
    }
}) ;

    

app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.dir(req.params.id);
    try {
        const query = `select r.*, (select count(*) from reviews v where v.restaurant_id=r.id) as count_reviews, (select trunc(avg(v.rating),1) from reviews v where v.restaurant_id=r.id) as avg_rating from restaurants r where id=$1`;
        console.log(`query = ${query}`)
        const results = await db.query(query, [req.params.id]);
        console.dir(results)
        res.status(200).json({
                           status: "success",
                           data: {
                                    restaurant: results.rows[0]
                           }
                        });
    } catch(err) {
        console.error(err);
    }
}) ;



app.get("/api/v1/restaurants/:id/reviews", async (req, res) => {
    console.dir(req.params.id);
    try {
        const query = `select * from reviews where restaurant_id=$1`;
        console.log(`query = ${query}`)
        const results = await db.query(query, [req.params.id]);
        console.dir(results)
        res.status(200).json({
                           status: "success",
                           data: {
                                    reviews: results.rows
                           }
                        });
    } catch(err) {
        console.error(err);
    }
}) ;



app.post("/api/v1/restaurants", async (req, res) => {
    console.dir(req.body);
    try {
        const query = `insert into restaurants(name,location,price_range) select $1,$2,$3 returning *`;
        console.log(`query = ${query}`)
        const results = await db.query(query, [req.body.name, req.body.location, req.body.price_range]);
        console.dir(results)
        res.status(201).json({
                           status: "success",
                           data: {
                                    restaurant: results.rows[0]
                           }
                        });
    } catch(err) {
        console.error(err);
    }
}) ;




app.post("/api/v1/restaurants/:id/reviews", async (req, res) => {
    console.dir(req.body);
    try {
        const query = `insert into reviews(restaurant_id,name,review,rating) select $1,$2,$3,$4 returning *`;
        console.log(`query = ${query}`)
        const results = await db.query(query, [req.params.id, req.body.name, req.body.review, req.body.rating]);
        console.dir(results)
        res.status(201).json({
                           status: "success",
                           data: {
                                    review: results.rows[0]
                           }
                        });
    } catch(err) {
        console.error(err);
    }
}) ;

app.put("/api/v1/restaurants", async (req, res) => {
    console.dir(`update: name=${req.body.name}, location=${req.body.location}, price_range=${req.body.price_range}, id=${req.body.id}`);
    try {
        const query = `update restaurants set name=$1, location=$2, price_range=$3 where id=$4 returning *`;
        console.log(`query = ${query}`)
        const results = await db.query(query, [req.body.name, req.body.location, req.body.price_range, req.body.id]);
        res.status(201).json({
                           status: "success",
                           data: {
                                    restaurant: results.rows[0]
                           }
                        });
    } catch(err) {
        console.error(err);
    }
}) ;



app.delete("/api/v1/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    console.log(`delete id=${id}`);
    try {
        const query = `delete from restaurants where id=$1 returning *`;
        console.log(`query = ${query}`)
        const results = await db.query(query, [id]);
        res.status(204).json({
                           status: "success",
                           data: {
                                    restaurant: results.rows[0]
                           }
                        });
    } catch(err) {
        console.error(err);
    }
}) ;