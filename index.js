const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// middle Wars 
app.use(cors());
app.use(express.json());

//database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0ww6vlu.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoriesCollection = client.db('carSwap').collection('Categories')
        const CarsCollection = client.db('carSwap').collection('cars')
        const CurrentUserCollection = client.db('carSwap').collection('currentUser')
        const ReportedItemsCollection = client.db('carSwap').collection('reportedItems')
        app.get('/categories', async (req, res) => {
            const query = {}
            const cursor = categoriesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        //all car
        app.get('/cars', async (req, res) => {
            const query = {}
            const cursor = CarsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        //get car by id
        app.get("/cars/:id", async (req, res) => {
            const id = req.params.id;
            const query = { category_id:id};
            const cursor =CarsCollection.find(query).sort({time:-1});
            const result = await cursor.toArray();
            // console.log(query);
            res.send(result);
        });
        app.get("/car/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor =CarsCollection.find(query);
            const result = await cursor.toArray();
            // console.log(query);
            res.send(result);
        });
        //insert car to cars collection
        app.post("/cars", async (req, res) => {
            const user = req.body;
            const result = await CarsCollection.insertOne(user);
            res.send(result);
        });
        //insert user to database
        app.post("/user", async (req, res) => {
            const user = req.body;
            const result = await CurrentUserCollection.insertOne(user);
            res.send(result);
        });
        //for get user by role
        app.get('/users/:role', async (req, res) => {
            const role = req.params.role;
            const query = {rolePermission:role};
            const cursor =CurrentUserCollection.find(query).sort({time:-1});
            const result = await cursor.toArray();
            res.send(result);
        })
        // for get seller  by id
        app.get("/users/seller/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = CurrentUserCollection.find(query);
            const result = await cursor.toArray();
            console.log(query);
            res.send(result);
        });
        // specific seller delete by id
        app.delete("/users/seller/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await CurrentUserCollection.deleteOne(query);
            console.log(query);
            res.send(result);
        });
        // for get buyer  by id
        app.get("/users/buyer/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = CurrentUserCollection.find(query);
            const result = await cursor.toArray();
            console.log(query);
            res.send(result);
        });
        // specific buyer delete by id
        app.delete("/users/buyer/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await CurrentUserCollection.deleteOne(query);
            console.log(query);
            res.send(result);
        });
        // get user by mail
        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const query = {email:email};
            const cursor =CurrentUserCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        //Reported item insert by id
        app.post("/reportedItem/:id", async (req, res) => {
            const id = req.body;
            const result = await ReportedItemsCollection.insertOne(id);
            res.send(result);
        });
        // get reported items
        app.get('/reportedItems', async (req, res) => {
            const query = {};
            const cursor =ReportedItemsCollection.find(query).sort({time:-1});
            const result = await cursor.toArray();
            res.send(result);
        });
        //get specific reported items
        app.get("/reportedItems/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id)};
            const cursor = ReportedItemsCollection.find(query);
            const result = await cursor.toArray();
            console.log(query);
            res.send(result);
        });
        //delete reported item from cars collection
        app.delete("/car/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await CarsCollection.deleteOne(query);
            console.log(query);
            res.send(result);
        });
        //delete reported item from reported item collection
        app.delete("/reportedItems/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id)};
            const result = await ReportedItemsCollection.deleteOne(query);
            console.log(query);
            res.send(result);
        });
    }

    finally {
    }
}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Car Swap Server is Running');
})

app.listen(port, () => {
    console.log(`Car Swap Server Running on ${port}`);
})