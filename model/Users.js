const myDB = client.db("comp229_db");
const myColl = myDB.collection("users");
let users = myDB.Schema({
    email : String,
    password : String,
    username : String
})
// const doc = { 
//     name: "Neapolitan pizza", shape: "round" 
// };
const result = await myColl.insertOne(users);

result.then(success=>{
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
    );    
})


module.exports = myDB.model('users',usersModel);