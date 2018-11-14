const tester = require('graphql-tester').tester;


describe('A user', function() {
    const self = this;
    beforeAll(() => {
      self.test = tester({
        url: `http://127.0.0.1:4000/graphql`,
        contentType: 'application/json'
      });
    });

    it('should work, maybe', done => {
        self.test(JSON.stringify({ 'query': '{ user(username: "sudo") {username uid} }' }, ))
        .then(res => {
            console.log(res)
            expect(res.status).toBe(200);
            expect(res.success).toBe(true);
            expect(res.data.user.username).toBe('sudo');
            expect(res.data.user.uid).toBe(1);
            done();
            }
        ).catch(err => {
            done();
        })
    })
})
