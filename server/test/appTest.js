var chai = require('chai');
var assert = chai.assert;
var app = require('../app')

chai.use(require('chai-http'));

describe('Functional tests for CleanFlow API',()=>{

  it('Should request the landing page and get valid response',(done)=>{
    chai.request(app)
    .get('/api')
    .end((err,response)=>{
      assert.equal(response.status,200);
      done();
    })
  });

  describe('Authentication tests',function(){
    this.timeout(5000);
    let validUser;

    describe('Register',function(){

      it('Should successfully register a user',(done)=>{
        chai.request(app)
        .post('/api/auth/register')
        .set('content-type','application/json')
        .send({firstName:'Michael',lastName:'Michelini',username:'mmichelini',password:'testpassword',email:'test@email.com'})
        .end(function(err,res){
          assert.isNotOk(err)
          assert.equal(res.status,202);
          assert.equal(res.body.name,'michael michelini');
          assert.equal(res.body.username,'mmichelini');
          assert.equal(res.body.email,'test@email.com');
          validUser = res.body
          done();
        });
      });

      it('Should try and fail to register a duplicate username',(done)=>{
        chai.request(app)
        .post('/api/auth/register')
        .set('content-type','application/json')
        .send({firstName:'Test',lastName:'Test',username:'mmichelini',password:'testpassword',email:'test@email.com'})
        .end(function(err,res){
          assert.isNotOk(err);
          assert.equal(res.status,400);
          assert.exists(res.body.message);
          assert.exists(res.body.duplicatedPath);
          assert.equal(res.body.duplicatedPath,'username');
          assert.equal(res.body.message,'The given username is taken. Please try again with a different username.');
          done();
        });
      });

      it('Should try and fail to register a duplicate email',(done)=>{
        chai.request(app)
        .post('/api/auth/register')
        .set('content-type','application/json')
        .send({firstName:'Test',lastName:'Test',username:'test',password:'testpassword',email:'test@email.com'})
        .end(function(err,res){
          assert.isNotOk(err);
          assert.equal(res.status,400);
          assert.exists(res.body.message);
          assert.exists(res.body.duplicatedPath);
          assert.equal(res.body.duplicatedPath,'email');
          assert.equal(res.body.message,'The given email is taken. Please try again with a different email.');
          done();
        });
      });

      it('Should try and fail to register an empty user',(done)=>{
      chai.request(app)
      .post('/api/auth/register')
      .set('content-type','application/json')
      .end(function(err,res){
        assert.isNotOk(err);
        assert.equal(res.status,400);
        assert.isArray(res.body);
        assert.equal(res.body.length,5);
        done();
      });
    });

    })

    describe('Login',function(){

      it('Should successfully login that user',(done)=>{
        chai.request(app)
        .post('/api/auth/login')
        .set('content-type','application/json')
        .send({email:'test@email.com',password:'testpassword'})
        .end(function(err,res){
          assert.isNotOk(err)
          assert.equal(res.status,200);
          assert.equal(res.body.name,'michael michelini');
          assert.equal(res.body.username,'mmichelini');
          assert.equal(res.body.email,'test@email.com');
          assert.exists(res.body.token);
          validUser = res.body
          done();
        });
      });

      it('Should try and fail login with invalid password',(done)=>{
        chai.request(app)
        .post('/api/auth/login')
        .set('content-type','application/json')
        .send({email:'test@email.com',password:'wrongpassword'})
        .end(function(err,res){
          assert.isNotOk(err);
          assert.equal(res.status,404);
          assert.exists(res.body.message);
          assert.equal(res.body.message,'Invalid password!');
          done();
        });
      });

      it('Should try and fail login with invalid password',(done)=>{
        chai.request(app)
        .post('/api/auth/login')
        .set('content-type','application/json')
        .send({email:'wrong@email.com',password:'wrongpassword'})
        .end(function(err,res){
          assert.isNotOk(err);
          assert.equal(res.status,404);
          assert.exists(res.body.message);
          assert.equal(res.body.message,'Email not found!');
          done();
        });
      });

    })

    describe('Delete',function(){

      it('Should try and fail to delete user with no authentication',(done)=>{
        chai.request(app)
        .delete(`/api/auth/${validUser._id}`)
        .set('content-type','application/json')
        .end(function(err,res){
          assert.isNotOk(err)
          assert.equal(res.status,401);
          assert.exists(res.body.message);
          assert.equal(res.body.message,'Unauthorized');
          done();
        });
      });

      it('Should try and fail to delete user with invalid authentication',(done)=>{
        chai.request(app)
        .delete(`/api/auth/${validUser._id}`)
        .set('authorization', `Bearer invalidtoken`)
        .set('content-type','application/json')
        .end(function(err,res){
          assert.isNotOk(err)
          assert.equal(res.status,401);
          assert.exists(res.body.message);
          assert.equal(res.body.message,'Unauthorized');
          done();
        });
      });

      it('Should delete user',(done)=>{
        chai.request(app)
        .delete(`/api/auth/${validUser._id}`)
        .set('content-type','application/json')
        .set('authorization', `Bearer ${validUser.token}`)
        .end(function(err,res){
          assert.isNotOk(err)
          assert.equal(res.status,202);
          done();
        });
      });

      it('Should try and fail to delete user that no longer exists',(done)=>{
        chai.request(app)
        .delete(`/api/auth/${validUser._id}`)
        .set('content-type','application/json')
        .set('authorization', `Bearer ${validUser.token}`)
        .end(function(err,res){
          assert.isNotOk(err)
          assert.equal(res.status,404);
          assert.exists(res.body.message);
          assert.equal(res.body.message,'Whoops. Something went wrong!');
          done();
        });

      });

    });

  });

});
