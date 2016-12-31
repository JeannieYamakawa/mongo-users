const assert = require('assert');
const User = require('../src/user')

describe('Creating records', () => {

    it('saves a user', () => {
        const jeannie = new User({name: 'Jeannie'});
        // //save() is a method provided by mongoose
        jeannie.save()
        //     .then(()=>{
                //has joe been saved successfully?
                //isNew is an indicator as to whether or not joe has been successfully saved to the DB. assert statement has bang and should be true.
            //     done();
            //
            // })

    });

});
