const max = 350;
const min = 90

exports.now = function (ws, broadcast) {
  const yous = Math.floor(Math.random() * (max - min)) + min;

  for (let i = 0; i < yous; i++) {
    setTimeout(() => {
      broadcast('you', ws, true)
    }, i++ * 580)
  }
}