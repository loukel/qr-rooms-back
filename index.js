const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const socket = require("socket.io")
const Gathering = require('./models/gathering')

const app = express()

mongoose.connect('mongodb://localhost:27017/qr-rooms')
const server = app.listen(3001)

