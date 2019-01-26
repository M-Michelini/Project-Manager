var chai = require('chai');
var assert = chai.assert;
var app = require('../app')

chai.use(require('chai-http'));

describe('Function tests for CleanFlow API',()=>{
  describe('Authentication tests',()=>{
    it('Should request the landing page and get valid response',(next)=>{
      chai.request(app)
      .get('/api')
      .end((err,response)=>{
        assert.equal(response.status,200)
        next()
      })
    })
  })
})
