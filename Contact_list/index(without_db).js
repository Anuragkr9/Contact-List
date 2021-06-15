// const { static } = require('express');
//getting the express module
const express = require('express');
const port =8080;
//path module for __dirname which gives the current directory
const path = require('path');
//firing up the express server
var app = express();
//setting the template engine(view engine) as ejs 
app.set('view engine','ejs');
// setting the view to the view directory view of MVC., __dirname -- current working directory.( to make it dynamic)
app.set('views', path.join(__dirname,'view'));
//Middleware to parse the data submitted through form as that was encoded, it add it as a object of res.body.
app.use(express.urlencoded());

//middleware that figure out all the css file,images and fonts
app.use(express.static('assets'))
var contactList = [
    {
        name: 'Anurag Kumar',
        phone:2389873493
    },
    {
        name:'Sanjay Gupta',
        phone:2394839493
    }
]
var cond = true;
app.get('/',function(req,res){

    // render the passed html/ejs file, which is available inside view directory
    res.render('index',{
        name :'Anurag Kumar', 
        contact_list: contactList,
    });

    //sending a static web page to the browser
    // res.sendFile(path.join(__dirname,'hii.html'));

})
app.get('/practice',function(req,res){


  return res.render('practice',{
        name:'Anurag',
        cond:false,
    });
})
app.post('/create_contact',function(req,res){

    //we add the new contacts to the contactList
    contactList.push(req.body);

    return res.redirect('/');
    
   
})


console.log('server is running! ');
  
app.listen(port)

