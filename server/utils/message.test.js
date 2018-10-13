const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () =>{
  it('should generate correct message object', ()=>{
    var result = generateMessage('User1', 'Message1');

    expect(result.from).toBe('User1')
    expect(result.text).toBe('Message1')
    expect(typeof result.createdAt).toBe('number');
  })

})
