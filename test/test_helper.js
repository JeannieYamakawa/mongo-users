const mongoose = require('mongoose');

//says to mongoose to use the ES6 version of promises whenever it needs to create a new Promise.
mongoose.Promise = global.Promise;


//before function's done callback says 'mocha, run tests once the mongo connection is up and running.'
before((done) => {
    //must include this line. localhost would be replaced by a port in production, and mongo-users_test is the name of the database.
    mongoose.connect('mongodb://localhost/mongo-users_test');

    mongoose.connection
        //watch for mongoose to emit an event called either 'open' or 'error' when we try to initiate connection.
        .once('open', () => {
            //run node this file in CLI and make sure it says 'Good to go!'
            // console.log('Good to go!')

            done();
        })
        .on('error', (error) => {
            console.warn('Error', error);
        });
})



//for test suite, clear table before each test
beforeEach( (done) =>{
    //drop() accepts a callback function to run after it's done, which is passed in as (done) arg above
    mongoose.connection.collections.users.drop( () =>{
        //calling the done callback says to mocha 'ready to run next test'
        done();
    });
});
