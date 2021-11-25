const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sfmd0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

app.use(cors());
app.use(express.json());



async function run(){
    try{
        await client.connect();
        const database = client.db('Tours')
        const toursCollection= database.collection('tour');
        const bookingCollection= database.collection('booking')


        // get Tours api
    
    app.get('/Tours', async(req, res)=>{
        const cursor = toursCollection.find({});
        const Tour= await cursor.toArray();
        res.send(Tour);
    })  
    
    // get single data

    app.get('/Tours/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const Tour = await toursCollection.findOne(query);
        
        res.send(Tour);
    })


    // add orders api

    app.post('/booking', async(req, res)=>{
        const booking= req.body;
        const result = await bookingCollection.insertOne(booking)
        res.json(result)
    })


    //get orders api
    app.get('/books', async(req, res)=>{
        const cursor = bookingCollection.find({});
        const books= await cursor.toArray();
        res.send(books);
    })  
     
    //delet api

    app.delete('/books/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await bookingCollection.deleteOne(query);
        res.json(result);
    })

    
    
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log('Server running at port', port);
})