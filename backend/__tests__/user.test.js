const tester = require('graphql-tester').tester;


describe('A user', function () {
    const self = this;
    beforeAll(() => {
        self.test = tester({
            url: `http://127.0.0.1:4000/graphql`,
            contentType: 'application/json'
        });
    });

    it('Is able to add a new user to the database', done => {
        self.test(JSON.stringify({
                'query': ' mutation { addUser(username: "sudo") {username uid} }'
            }))
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.success).toBe(true);
                let resJson = JSON.parse(res.raw).data.addUser
                expect(resJson.username).toBe('sudo');
                expect(resJson.uid).toBe(1);
                done();
            }).catch(err => {
                done();
            })
    })

    it('Can fetch ("login") username and uid from the database', done => {
        self.test(JSON.stringify({
                'query': '{ user(username: "sudo") {username uid} }'
            }, ))
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.success).toBe(true);
                let resJson = JSON.parse(res.raw).data.user
                expect(resJson.username).toBe('sudo');
                expect(resJson.uid).toBe(1);
                done();
            }).catch(err => {
                done();
            })
    })
})