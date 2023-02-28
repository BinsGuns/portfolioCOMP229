let express = require ('express');
const mongo = require("mongodb");
let router = express.Router();
let BusinessModel = require('../model/Business');
const {ObjectId} = require("mongodb");

module.exports.displayBusinessList = (req,res,next)=>{

    const collection = BusinessModel.find({}).sort({"name":1});
    collection.toArray().then(data =>{
        // console.log(data)
        res.render('business', {title:'Business', BusinessList:data});
    })
    
}

module.exports.DeleteBusiness = (req,res,next)=>{
    
    let id = req.params.id;
    console.log(id)
    BusinessModel.deleteOne({_id: new ObjectId(id)}).then(result =>{
        // console.log("DEKETED "+result)
        res.redirect('/business');
    })
}

module.exports.EditBusiness = (req,res,next)=>{
   
    console.log("EDDIIITT");
   
    console.log(req.body.name);
    BusinessModel.findOneAndUpdate({_id:new ObjectId(req.body.id)},{
        $set : {
            name : req.body.name,
            address: req.body.address,
            mobile: req.body.mobile
        }
    },    { upsert: true }).then(result =>{
        console.log("UPDATED");
        res.redirect('/business');
    })
    // Book.findById(id,(err,bookToEdit)=>{
    //     if(err)
    //     {
    //         console.log(err);
    //         res.end(err);
    //     }
    //     else
    //     {
    //         res.render('book/edit',{title:'Edit Book', book: bookToEdit});
    //
    //     }
    // });
}

module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id
    console.log(req.body);
    let updatedBook = Book({
        "_id":id,
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description":req.body.description,
        "price":req.body.price
    });
    Book.updateOne({_id:id}, updatedBook,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/business');
        }
    });
}

module.exports.performDelete= (req,res,next)=>{
    let id = req.params.id;
    Book.remove({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/bookList');
        }
    });
}