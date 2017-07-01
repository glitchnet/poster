(function () {
  var host = 'poster.glitch.me'
  var protocol = document.location.protocol
  var ws = new window.WebSocket('wss://' + host)

  function connect () {
    ws.onerror = function (e) {
      console.log('could not connect', e)
    }

    ws.onopen = function () {
      console.log('connection opened')
      if (ws.readyState === 1) {
        ws.send('message', 'true')

        ws.onmessage = function (data) {
          var posx = Math.floor(Math.random() * (80 - 10 + 1)) + 10
          var posy = Math.floor(Math.random() * (90 - 20 + 1)) + 20
          var fontsize = Math.floor(Math.random() * (180 - 50 + 1)) + 50
          var p = document.createElement('p')
          p.style =  'left: ' + posx + 'vw; top: ' + posy + 'vh; font-size: ' + fontsize + 'px'
          p.textContent = data.data.replace(/"|"/g,'')
          document.body.appendChild(p)
          setTimeout(function () {
            document.body.removeChild(p)
          }, 5000)
        }
      } else {
        setTimeout(() => {
          connect()
        }, 1500)
      }
    }

    ws.onclose = function () {
      console.log('reconnecting to', host)
      setTimeout(() => {
        connect()
      }, 1500)
    }
  }

  connect()
})()
