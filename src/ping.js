const pong = require('./pong')
const max = 350;
const min = 90;

exports.now = function (ws, broadcast) {
  const fucks = Math.floor(Math.random() * (max - min)) + min;

  for (let i = 0; i < fucks; i++) {
    setTimeout(() => {
      broadcast('fuck', ws, true) 
    }, i++ * 500)
  }  
  pong.now(ws, broadcast)
}