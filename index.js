const express = require('express')
const socket = require('socket.io')
const redis = require('redis')
const dotenv = require('dotenv')

const client = redis.createClient(process.env.REDIS_URL)

client.on("error", error => {
  console.error(error)
})

dotenv.config()

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

    const gathering = { id, attendees: [] }
    gatherings.push(gathering)
    socket.join(id)
    io.in(id).emit('gathering', gathering)
  })

  socket.on('gathering:add', socials => {
    const [, gatheringId] = Array.from(socket.rooms)
    if (gatheringId) {
      gatheringIndex = gatherings.findIndex((gathering) => gathering.id === gatheringId)
      gatherings[gatheringIndex].attendees.push(socials)
      io.in(gatheringId).emit('gathering', gatherings[gatheringIndex])
    }
  })
}

io.on('connection', onConnection)
