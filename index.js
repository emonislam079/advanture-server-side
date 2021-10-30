const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

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



        // get Tours api
    
    app.get('/Tours', async(req, res)=>{
        const cursor = toursCollection.find({});
        const Tour= await cursor.toArray();
        res.send(Tour);


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