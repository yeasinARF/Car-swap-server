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
        // app.post('/jwt', (req, res) => {
        //     const user = req.body
        //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECTRET, { expiresIn: '7d' })
        //     res.send({ token })
        // })
        //all categories
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

        app.get("/cars/:id", async (req, res) => {
            const id = req.params.id;
            const query = { category_id:id};
            const cursor =CarsCollection.find(query);
            const result = await cursor.toArray();
            // console.log(query);
            res.send(result);
        });

        // app.post("/allServices", async (req, res) => {
        //     const service = req.body;
        //     console.log(service);
        //     const result = await serviceCollection.insertOne(service);
        //     res.send(result);
        // });
        // app.post("/reviews", async (req, res) => {
        //     const review = req.body;
        //     console.log(review);
        //     const result = await ReviewCollection.insertOne(review);
        //     res.send(result);
        // });
        // app.get('/reviews', async (req, res) => {
        //     const query = {}
        //     const cursor = ReviewCollection.find(query);
        //     const result = await cursor.toArray();
        //     res.send(result);
        // })
        // app.get("/reviews/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const query = { service_id: id };
        //     const cursor = ReviewCollection.find(query);
        //     const result = await cursor.toArray();
        //     console.log(query);
        //     res.send(result);
        // });
        // app.get("/review/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const cursor = ReviewCollection.find(query);
        //     const result = await cursor.toArray();
        //     console.log(query);
        //     res.send(result);
        // });
        // app.patch("/review/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const updatedReview = req.body;
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: {
        //             message: updatedReview.message,
        //         },
        //     };
        //     const result = await ReviewCollection.updateOne(query, updateDoc, options);
        //     res.send(result);
        // });
        // app.delete("/review/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await ReviewCollection.deleteOne(query);
        //     console.log(query);
        //     res.send(result);
        // });
        // app.get("/myreviews/:email", verifyJWT, async (req, res) => {
        //     // console.log(req.headers.authorization);
        //     const decoded = req.decoded;
        //     if (decoded.email !== req.params.email) {
        //         res.status(403).send({ message: 'unauthorized access' })
        //     }
        //     const email = req.params.email;
        //     const query = { email: email };
        //     const cursor = ReviewCollection.find(query).sort({ time: -1 });
        //     const result = await cursor.toArray();
        //     console.log(query);
        //     res.send(result);
        // });
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