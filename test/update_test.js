const assert = require('assert');
const User = require('../src/user')

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name:"Joe", postCount: 0});
        joe.save()
            .then(()=>{
                done();
            })
    })


    function assertName(operation, done){
        operation
        .then( () =>
            User.find({}) )
            .then((usersReturned) => {
                        assert(usersReturned.length === 1);
                        assert(usersReturned[0].name ==='Alex');
                        done();
                    });
    }

    it('instance type using set and save', (done) => {
        // console.log(joe);
        //set used to change a property on a model instance
        joe.set('name', 'Alex');
        // console.log(joe); //returns object with 'Alex' as name

        //MUST SAVE THIS CHANGE TO TEST IT
        joe.save()
            .then(()=> {
                //passing in the empty object will fetch a list of ALL users in our table/collection
                User.find({})
                    .then((usersReturned)=>{
                        assert(usersReturned.length ===1);
                        assert(usersReturned[0].name ==='Alex');
                        done();
                    })

            })
    });


    it('A model instance can update', (done) => {
        //same as the test in the first 'it' block
        assertName(joe.update({name: 'Alex'}), done);
    });


    it('A model class can update', (done) => {
        //replace ALL records with name of Joe to have the name of Alex
        assertName(User.update({ name: 'Joe' }, {name: 'Alex'}), done)
    });



    it('A model class can update one record', (done) => {
        //update a SINGLE record by passing it a unique attribute. finds the first record that matches the gived condition and updates.
        assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}), done)
    });


    it('A model class can find a record with an Id and update', (done) => {
        //update the record where id matches joe's id
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done)
    });


    it('A user who meets criteria can have his/her post count incremented by 1', (done) => {
        //server sends instructions and increments by one instead of just updating. See Mongo docs for many other options.
        User.update({name: 'Joe'}, {$inc: {postCount: 10}})
            .then( () => User.findOne({name: 'Joe'}))
            .then( (returnedUser) => {
                assert(returnedUser.postCount ===10);
                done();
            });
    });

});
