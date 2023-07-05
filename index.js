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
        const AdvertiseItemsCollection = client.db('carSwap').collection('advertise')
        const OrderedItemsCollection = client.db('carSwap').collection('orders')
        const MessageCollection = client.db('carSwap').collection('message')
        app.get('/categories', async (req, res) => {
            const query = {}
            const cursor = categoriesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        //get get categories by email
        app.get('/categories/:email', async (req, res) => {
            const email = req.params.email;
            const query = { seller_email: email };
            const cursor = categoriesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        // individual seller categories
        app.get('/categories', async (req, res) => {
            const query = {}
            const cursor = categoriesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        //all car
        app.get('/cars', async (req, res) => {
            const query = {}
            const cursor = CarsCollection.find(query).sort({ _id:-1});
            const result = await cursor.toArray();
            res.send(result);
        })
        //get car by id
        app.get("/cars/:id", async (req, res) => {
            const id = req.params.id;
            const query = { category_id: id };
            const cursor = CarsCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            // console.log(query);
            res.send(result);
        });
        app.get("/car/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = CarsCollection.find(query);
            const result = await cursor.toArray();
            // console.log(query);
            res.send(result);
        });
        app.get("/carSeller/:email", async (req, res) => {
            const email = req.params.email;
            const query = { seller_email: email };
            const cursor = CarsCollection.find(query);
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
        // insert categories 
        app.post('/categories', async (req, res) => {
            const category = req.body;
            const result = await categoriesCollection.insertOne(category);
            res.send(result);
        })
        //insert user to database
        app.post("/user", async (req, res) => {
            const user = req.body;
            const result = await CurrentUserCollection.insertOne(user);
            res.send(result);
        });
        app.get('/message', async (req, res) => {
            const query = {}
            const cursor = MessageCollection.find(query).sort({ _id:-1});
            const result = await cursor.toArray();
            res.send(result);
        })
        // message collection insert data 
        app.post("/message", async (req, res) => {
            const message = req.body;
            const result = await MessageCollection.insertOne(message);
            res.send(result);
        });
        //for get user by role
        app.get('/users/:role', async (req, res) => {
            const role = req.params.role;
            const query = { rolePermission: role };
            const cursor = CurrentUserCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            res.send(result);
        })
        // for get seller  by id
        app.get("/users/seller/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = CurrentUserCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            console.log(query);
            res.send(result);
        });
        app.get("/users", async (req, res) => {
            const query = {}
            const cursor = CurrentUserCollection.find(query).sort({ _id:-1});
            const result = await cursor.toArray();
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
            const cursor = CurrentUserCollection.find(query).sort({ _id: -1 });
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
            const query = { email: email };
            const cursor = CurrentUserCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            res.send(result);
        });
        //get product by email
        app.get('/products/:email', async (req, res) => {
            const email = req.params.email;
            const query = { seller_email: email };
            const cursor = CarsCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get('/categorySeller/:email', async (req, res) => {
            const email = req.params.email;
            const query = { seller_email: email };
            const cursor = categoriesCollection.find(query).sort({ _id: -1 });
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
            const cursor = ReportedItemsCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            res.send(result);
        });
        //get specific reported items
        app.get("/reportedItems/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = ReportedItemsCollection.find(query).sort({_id:-1});
            const result = await cursor.toArray();
            console.log(query);
            res.send(result);
        });
        //delete individual product item from cars collection
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
            const query = { _id: ObjectId(id) };
            const result = await ReportedItemsCollection.deleteOne(query);
            console.log(query);
            res.send(result);
        });
        //insert advertise item
        app.post("/advertise", async (req, res) => {
            const item = req.body;
            const result = await AdvertiseItemsCollection.insertOne(item);
            res.send(result);
        });
        //get ad items
        app.get("/advertise", async (req, res) => {
            const id = req.params.id;
            const query = {};
            const limit = 6;
            const cursor = AdvertiseItemsCollection.find(query).sort({ _id: -1 }).limit(limit);
            const result = await cursor.toArray();
            console.log(query);
            res.send(result);
        });
        // single ad product 
        app.get("/advertiseItem", async (req, res) => {
            const id = req.params.id;
            const query = {};
            const limit = 4;
            const cursor = AdvertiseItemsCollection.find(query).sort({ _id: -1 }).limit(limit);
            const result = await cursor.toArray();
            console.log(query);
            res.send(result);
        });
        app.get("/advertise/:id", async (req, res) => {
            const id = req.params.id;
            const query = { item_id: id };
            const cursor = AdvertiseItemsCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            // console.log(query);
            res.send(result);
        });
        //insert order item
        app.post("/orderItems", async (req, res) => {
            const item = req.body;
            const result = await OrderedItemsCollection.insertOne(item);
            res.send(result);
        });
        //get order by email
        app.get('/orders/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const cursor = OrderedItemsCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            res.send(result);
        });
        // get customer order by email
        app.get('/customerOrder/:email', async (req, res) => {
            const seller_email = req.params.email;
            const query = { seller_email: seller_email };
            const cursor = OrderedItemsCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get("/customerOrderId/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = OrderedItemsCollection.find(query).sort({ _id: -1 });
            const result = await cursor.toArray();
            console.log(query);
            res.send(result);
        });
        app.patch("/customerOrderId/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const updatedStatus = req.body;
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    payment_status:updatedStatus.payment_status,
                    delivery_status:updatedStatus.delivery_status
                },
            };
            const result = await OrderedItemsCollection.updateMany(query,updateDoc,options);
            res.send(result);
        });
        
        app.patch("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const updatedName = req.body;
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name:updatedName.name,
                    stockQuantity:updatedName.stockQuantity,
                    resale_price:updatedName.resale_price
                },
            };
            const result = await CarsCollection.updateMany(query,updateDoc,options);
            res.send(result);
        });
        // brand update 
        app.patch("/categoriesData/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const updatedName = req.body;
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name:updatedName.name,
                },
            };
            const result = await categoriesCollection.updateOne(query,updateDoc,options);
            res.send(result);
        });
        // brand delete 
        app.delete("/categories/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await categoriesCollection.deleteOne(query);
            console.log(query);
            res.send(result);
        });
        //order delete
        app.delete("/order/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await OrderedItemsCollection.deleteOne(query);
            console.log(query);
            res.send(result);
        });
        // all order delete
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