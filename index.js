const express = require('express')
const socket = require('socket.io')

const app = express()

// Start Server 🎉
const PORT = process.env.PORT || 3001
let server = app.listen(PORT, () => {
  console.log(`Web server listening on ${PORT}`)
})

const io = socket(server, {
  cors: {
    origin: '*',
  },
})

// const {} = require('./sockets')(io)
let gatherings = []
const onConnection = socket => {
  socket.on('gathering:join', gatheringId => {
    const [gathering] = gatherings.filter(gathering => gathering.id === gatheringId)
    if (!gathering) {
      socket.emit('gathering', 404)
    } else {
      socket.join(gatheringId)
      socket.emit('gathering', gathering)
    }
  })

  socket.on('gathering:create', () => {
    const id = Math.random()
      .toString(36)
      .substring(7)

    const gathering = { id }
    gatherings.push(gathering)
    socket.join(id)
    io.in(id).emit('gathering', gathering)
  })
}

io.on('connection', onConnection)
