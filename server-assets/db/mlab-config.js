var connectionString = "mongodb://tcproject:project1@ds054308.mlab.com:54308/star-logs"
var mongoose = require("mongoose")
var connection = mongoose.connection
mongoose.connect(connectionString)

connection.on('error', (err) => {
    console.error('mlab Error: ', err)
})

connection.once('open', () => {
    console.log('connected to mLab Baby')
})