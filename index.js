const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
// cors is an function, and we have to call it to fetch data in frontend, never forget that
app.use(cors());
// express.json is used for access post data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const users = [
  {
    id: 1,
    name: "Masum",
    email: "masum@gmail.com",
  },
  {
    id: 2,
    name: "Masum2",
    email: "masum@gmail.com",
  },
  {
    id: 3,
    name: "Masum3",
    email: "masum@gmail.com",
  },
];

const uri =
  "mongodb+srv://ariyan:MFfDIK5031bCTT86@cluster0.f57powx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("userDB");
    const userCollection = database.collection("userCollection");
    app.get("/users", async (req, res) => {
      const coursor = userCollection.find({});
      const users = await coursor.toArray();
      res.send(users);
    });

    // app.post("/users", async (req, res) => {
    //   const user = req.body;
    //   const result = await userCollection.insertOne(user);
    //   res.send(user);
    // });
  } finally {
  }
}
run().catch((err) => console.log(err));
app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter(
      (usr) => usr.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});
// username:ariyan
// password: MFfDIK5031bCTT86

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
