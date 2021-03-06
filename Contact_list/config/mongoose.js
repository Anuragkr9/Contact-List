//Setting up the mongoose setup to connect to the db, this file is being run when it is imported


const mongoose  =  require('mongoose');
mongoose.connect('mongodb://localhost/contact_list');

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));

db.once('open', function(){
    console.log('Mongoose is connected to the database!');
})