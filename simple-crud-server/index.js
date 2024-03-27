const express = require('express')
const cors= require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// mrgalib40
// 3ZBldJSyk3pveT2X




const uri = "mongodb+srv://mrgalib40:3ZBldJSyk3pveT2X@cluster0.rj0wyaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("userDB");
    const userCollection = database.collection("users");


    app.get('/users',async(req,res)=>{
      const cursor= userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/users',async(req,res)=>{
      const user=req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})