const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ndj1c5s.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const servicesOptionColection = client.db('weddingPhotographer').collection('serviceOptions', 'galleryImage', 'blogsData');
        const bookingsCollection = client.db('weddingPhotographer').collection('bookings');

        app.get('/serviceOptions', async(req, res) => {
            const query = {};
            const options = await servicesOptionColection.find(query).toArray();
            res.send(options);
        });

        app.get('/galleryImage', async(req, res) => {
                const query = {};
                const options = await servicesOptionColection.find(query).toArray();
                res.send(options);
            }),

            app.get('/blogsData', async(req, res) => {
                const query = {};
                const options = await servicesOptionColection.find(query).toArray();
                res.send(options);
            })

        app.post('/bookings', async(req, res) => {
            const booking = req.body
            console.log(booking);
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })
    } finally {

    }
}
run().catch(console.log);


app.get('/', (req, res) => {
    res.send('Wedding Server Running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})