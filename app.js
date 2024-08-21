const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listings = require("./models/listings");
const path = require("path");
const methodOverride = require("method-override");  // so that we can use put and delete request in http verbs


let port = 3000;
let MDB_URL = "mongodb://127.0.0.1:27017/airbnb";

app.set("views" ,path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then((res)=>{console.log("connected to database.");}).catch((err)=>{console.log(err);});
async function main(){
    await mongoose.connect(MDB_URL);
};

//EDIT
app.put("/listings/:id",(req, res)=>{
    let {id} = req.params;

});


//EDIT 
app.get("/listings/:id/edit", async(req, res)=>{
let {id} = req.params;
const List = await Listings.findById(id);
res.render("./listings/edit.ejs", {List});
});

//SHOW DETAILS
app.get("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    console.log(id);
    const Listing = await Listings.findById(id); 
    res.render("listings/show.ejs", { Listing });
});

//POST NEW
app.post("/listings", async(req, res)=>{
    let {title, description, image, price, location, country} = req.body;   //extract data from inputs
    console.log(title);
    let newListing = new Listings({                //schema bnvla hota tyachyat value taka ata ith je {var} bnvle na tyatun.
        title:title,
        description:description,
        image:image,
        price:price,
        location:location,
        country:country
    })
    await newListing.save()
    res.redirect("/listings");
});

//CREATE NEW 
app.get("/listings/new", async(req, res)=>{
    res.render("./listings/create.ejs");
});


//ALL LISTINGS
app.get("/listings", async(req,res)=>{
    let allListings = await Listings.find({});
    //console.log(allListings);
    res.render("./listings/index.ejs",{allListings});
});

//HOME
app.get("/", (req, res)=>{
    let msg = "WELCOME TO HOME PAGE.\nTHIS IS A ROOT." 
    res.send(msg);
});

app.listen(port, ()=>{
    console.log(`app is listening on the port ${port}.`);
});
