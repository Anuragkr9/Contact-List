// const { static } = require('express');
//getting the express module
const express = require("express");
const port = 8080;
//path module for __dirname which gives the current directory
const path = require("path");

// this will setup mongoose in other file and will be executed from here.
const db = require("./config/mongoose");
//getting the contact db which is defined inside /model/contact
const contact = require("./model/contact");

//firing up the express server
var app = express();
//setting the template engine(view engine) as ejs
app.set("view engine", "ejs");
// setting the view to the view directory view of MVC., __dirname -- current working directory.( to make it dynamic)
app.set("views", path.join(__dirname, "view"));
//Middleware to parse the data submitted through form as that was encoded, it add it as a object of res.body.
app.use(express.urlencoded());

//middleware that figure out all the css file,images and fonts
app.use(express.static("assets"));

app.get("/", function (req, res) {
  contact.find({}, function (err, contacts) {
    if (err) {
      console.error("Error while reading!:", err);
      return;
    }
    // return res.sendFile(path.join(__dirname,"view/hii.html"))
    return res.render("index", {
      contact_list: contacts,
    });
  });
});

//post method is used as we need to modify the db and then return contact db.
app.post("/create_contact", function (req, res) {
  //req.body is created by the middleware that decode the input data of the form.
  // and create the body object as a property of reqest object which has properties all the input of the form
  // with name as the name attribute of the input tag.
  contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (error, newContact) {
      if (error) {
        console.error("Error occured during inserting:", error);
        return;
      }
      // console.log(newContact);
      return res.redirect("back"); //back will redirect to the previous webpage.
    }
  );
});
app.get("/delete-contact", function (req, res) {
  // id is passed as a querry parameter to the url
  var id = req.query.id;
  contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error occured during deleting:", err);
    }
  });
  return res.redirect("/"); // at the home we has defined to print the contact list
});

app.listen(port);

console.log("server is running! ");
