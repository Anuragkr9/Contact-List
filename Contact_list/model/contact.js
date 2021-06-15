const mongoose = require('mongoose');


//define the schema
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    phone:Number
})
// instance of the database 'Contact' which is defined over the
//  'contactSchema'  schema

const Contact = mongoose.model('Contact' , ContactSchema)
module.exports = Contact; //exports contact db so that it could be used from 
                    //outside this file.