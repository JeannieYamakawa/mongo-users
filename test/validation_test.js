const assert = require('assert');
const User = require('../src/user');

describe ('Validating records', () => {

    it('requires a username to be included in request', () => {
        const user = new User({name: undefined});
        //synchronous validation process.if you use just validate instead of validate sync, we can run a callback on the return value from the validation for even more validation like checking for not-unique usernames.
        const validationResult = user.validateSync();
        // console.log(validationResult);
        //the message is stored on the error object

        //ES6 for message property from location to right of = sign
        const {message} = validationResult.errors.name;

        assert(message === 'Name is required.');

    });


    it('requires a username longer than 2 characters', () => {
        const user = new User({name: 'Al'});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;

        assert(message==='Name must be longer than 2 characters.')

    });

    it('disallows an invalid record from being saved to DB', (done) => {
        const user = new User({name: 'Al'});
        user.save()
            .catch((validationResult) =>{
                const {message} = validationResult.errors.name;

                assert(message === 'Name must be longer than 2 characters.');
                done();
            });
    });
    
});
