var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'User'

var schema = new Schema({
    name: {type: String, required: true},
    role: {type: String, enum: ['Admiral', 'Captain', 'Grunt'], required: true, default: 'Grunt'},
    created: {type: Date, default: Date.now()}
})

module.exports = mongoose.model(schemaName, schema)