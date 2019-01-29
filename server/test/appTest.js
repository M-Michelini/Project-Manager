var chai = require('chai');
var assert = chai.assert;
var app = require('../app')

chai.use(require('chai-http'));

describe('Function tests for CleanFlow API',()=>{
  describe('Authentication tests',function(){
    this.timeout(5000);
    it('Should request the landing page and get valid response',(done)=>{
      chai.request(app)
      .get('/api')
      .end((err,response)=>{
        assert.equal(response.status,200);
        done();
      })
    });

    it('Should post a valid user to the database',async()=>{
      const response = await new Promise((resolve,reject)=>{
        chai.request(app)
        .post('/api/register')
        .set('content-type','application/json')
        .send({firstName:'Michael',lastName:'Michelini',username:'mmichelini',password:'testpassword',email:'test@email.com'})
        .end(function(err,res){
          if(err) reject(err);
          resolve(res);
        })
      })
      assert.equal(response.status,202);
    })

  })
})
