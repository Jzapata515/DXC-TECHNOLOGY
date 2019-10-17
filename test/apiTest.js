const request = require('supertest');
var server = request.agent("http://localhost:8000");
var  should = require('chai').should();
var expect = require('chai').expect;



describe('POST /test',  function () {
    let body = {
        "numeros": [2,3,4,5,6,7]
    }
    let bodyError = {
        "numeros": [2,3,4,5,"6",7]
     }
   it('CASO 1 (POST /test)|Validación código 200',   function (done) {
        server 
            .post('/test')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err,res){
                expect(res.status).to.eq(200);
                done();
            });

    });

    it('CASO 2 (POST /test)|Validación código 422',   function (done) {
        server 
            .post('/test')
            .send(bodyError)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(function(err,res){
                expect(res.status).to.eq(422);
                done();
             });
    });

});
