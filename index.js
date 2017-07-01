const express = require('express')
const app = express()
const http = require('http')
const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server
const ping = require('./src/ping')
const path = require('path')

const server = http.createServer(app)
server.listen(process.env.PORT || 3000)

const wss = new WebSocketServer({
  server: server
})

app.use(express.static('public'));

app.on('upgrade', wss.handleUpgrade)

function broadcast (data, ws, sendToAll) {
  wss.clients.forEach(function each (client) {
    try {
      if (client.readyState === WebSocket.OPEN) {
        if (sendToAll) {
          client.send(JSON.stringify(data))
        } else if (client === ws) {
          client.send(JSON.stringify(data))
        }
      }
    } catch (e) {
      console.log('error: ', e)
    }
  })
}

wss.on('connection', (ws) => {
  console.log('connected')
  ws.on('message', () => {
    ping.now(ws, broadcast)
  })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})
