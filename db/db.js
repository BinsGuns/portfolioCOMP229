const {MongoClient, ServerApiVersion} = require("mongodb");
const crypto = require("crypto");


const uri = "mongodb+srv://vincegunday17:SeSGBgk86J6vEtFd@cluster0.zie08kj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {

    // perform actions on the collection object
    client.close();

}).then(success =>{
    
    // const myColl = client.db("comp229_db").collection("users");
    // const doc = { username: "user1", password: crypto.pbkdf2Sync('password', 'salt', 310000, 32, 'sha256') ,email:"testmail.com"};
    //  myColl.insertOne(doc);
    //
    // const collection = ;
   // console.log(collection)
});

