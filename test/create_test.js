const assert = require('assert');
const User = require('../src/user')

describe('Creating records', () => {

    it('saves a user', (done) => {
        //!!!DONT FORGET TO ^^^PASS IN DONE CALLBACK^^^!!!
        const joe = new User({name: 'Joe'});
        // //save() is a method provided by mongoose
        joe.save()
            .then( ()=>{
                //has joe been saved successfully?
                //isNew is an indicator as to whether or not joe has been successfully saved to the DB. assert statement has bang and should be true.
                assert(!joe.isNew)
                done();
            })
    });
});
