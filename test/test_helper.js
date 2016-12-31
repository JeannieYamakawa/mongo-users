const mongoose = require('mongoose');

//must include this line. localhost would be replaced by a port in production, and mongo-users-test is the name of the database.
mongoose.connect('mongodb://localhost/mongo-users-test');

mongoose.connection
    //watch for mongoose to emit an event called either 'open' or 'error' when we try to initiate connection.
    .once('open', () => {
        //run node this file in CLI and make sure it says 'Good to go!'
        console.log('Good to go!')
    })
    .on('error', (error) => {
        console.warn('Error', error);
    });
