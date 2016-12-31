const assert = require('assert');
const User = require('../src/user');


describe('Reading users our of the database', () => {

    let joe;


    beforeEach((done) => {
        //mongoose assigns an ID right when the User is instantiated and this is BEFORE it's inserted into the DB, unlike SQL
        joe = new User({name: 'Joe'});
        joe.save()
        .then(() => {
            done();
        })
    })

    it('finds all users with the name of joe', (done) => {
        User.find({ name: 'Joe'})
            .then((usersReturned) =>{
                console.log(usersReturned);
                // this test will FAIL because the mongoose _id is actually wrapped in an object.
                // assert(usersReturned[0]._id ===joe._id)
                //instead, convert to string:
                assert(usersReturned[0]._id.toString() ===joe._id.toString())
                done();
            });
    });
});
