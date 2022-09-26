const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const request = require('request');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

app.get("/", function(req, res){

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
   
    
    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

    let item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");  
    }
    
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});



