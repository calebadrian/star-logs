let express = require('express')
let bp = require('body-parser')
let cors = require('cors')

require('./server-assets/db/mlab-config.js')

let shipRoutes = require('./server-assets/routes/ships')
let logRoutes = require('./server-assets/routes/logs')
let commentRoutes = require('./server-assets/routes/comments')
let userRoutes = require('./server-assets/routes/users')

var server = express()
var port = 3000
server.use(bp.json())
server.use(bp.urlencoded({extended: true}))
server.use(cors())
server.use(shipRoutes)
server.use(logRoutes)
server.use(commentRoutes)
server.use(userRoutes)

server.use('*', (error, req, res, next) => {
    res.status(400).send(error)
})

server.get('*', (req, res, next) => {
    res.status(404).send(`
    <img src="https://media2.giphy.com/media/VwoJkTfZAUBSU/giphy.gif">`)
})

server.listen(port, () => {
    console.log("server running on: ", port)
})