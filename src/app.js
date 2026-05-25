const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors =  require('cors')
const e = require('express')

app.use(cors())

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

module.exports = app


