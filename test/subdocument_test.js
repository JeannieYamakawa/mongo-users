const assert = require('assert');
const User = require('../src/user');


describe('Subdocuments', () => {
    it('can create a subdocument, posts, for user', (done) => {
        const joe = new User(
            {name: 'Joe',
            //below is joe's embedded list of posts
            posts: [
                {title: "Joe's Post Title",
                content: 'blah blah post 1 content'}
            ]
        });
        joe.save()
            .then(() =>
                // console.log(joe, 'joe');
                //the findOne line below cannot be wrapped in curly braces within the fat arrow function without a return statement or else it will fail the test.
                {
                    return User.findOne({name: 'Joe'})
            })
            .then((userReturned) => {
                // console.log(userReturned, 'userReturned');
                assert(userReturned.posts[0].title === "Joe's Post Title");
                done();
            });
    });


    it('can add subdocuments to an existing record', (done) => {
        // *** 1. Create joe
        const joe = new User({name: 'Joe', posts: []});
        // *** 2. Save joe
        joe.save()
        // *** 3. Fetch joe
            .then(() => User.findOne({name: 'Joe'}))
            .then((userReturned) => {
                console.log(userReturned, ' userReturned');
                // *** 4. Add a post to joe
                userReturned.posts.push({title: "Joe's new post", content: "Content of Joe's new post"});
                // *** 5. Save joe again with new post(instead of saving the post itself)
                return userReturned.save();
                //MUST include return statement because I still want access to the user object that I just saved to do something else with it.
            })
        // *** 6. Fetch joe again with new post
        .then(() => User.findOne({name: 'Joe'}))
        // *** 7. Make assertion
            .then((userQueried) => {
                // console.log(userQueried, 'userQueried');
                assert(userQueried.posts[0].title=== "Joe's new post");
                done();
            })

    });
});
