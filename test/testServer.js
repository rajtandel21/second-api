const request = require('supertest');
const server = require('../server/createServer');


describe('API tests',  ()=>{
    let api;

    let testMovie = [
        {name: "kung fu panda", year: 2008}
    ];

    let dupMovie = [
        {name: "day after tomorrow", year: 2008}
    ];

    before(()=>{
        //start server
        api = server.listen(5000, ()=> console.log('\nTesting server is online\n'))
    });

    after((done)=>{
        //close server
        console.log('\nServer is Offline\n');
        api.close(done);
    })

    //Tests
    // 1. check that the server responds
    it('responds to "/" with server status 200', done=>{
        request(api)
            .get('/')
            .expect(200, done);
    })

    // 2. check that the server gets data
    it('responds to /movies', done=>{
        request(api)
            .get('/movies')
            .expect(200, done);
    })

    // 3. check that the server posts data
    it('responds to post new data', done=>{
        request(api)
            .post('/movies')
            .send(testMovie)
            .expect({id: 5, ...testMovie})
            .expect(201, done);
    })

    // 4. check that the server does not take dup data
    it('responds to duplicate data entry', done=>{
        request(api)
            .post('/movies')
            .send(dupMovie)
            .expect('Movie alread in list, enter another')
            .expect(400, done);
    })

    // 5. check that the server reponds with 404 for non-existing pages /bob
    it('responds to non-existing query', done=>{
        request(api)
            .get('/bob')
            .expect(404, done);
    })

    // 6. check if you can delete the last movie in the list
    it('responds to the delete movie', done=>{
        require(api)
            .delete('/movies')
            .expect(200, done);
    })


})