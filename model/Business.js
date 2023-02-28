const {MongoClient, ServerApiVersion} = require("mongodb");

const uri = "mongodb+srv://vincegunday17:SeSGBgk86J6vEtFd@cluster0.zie08kj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const myDB = client.db("comp229_db");
const businessCollection = myDB.collection("business");


module.exports = businessCollection