var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Ship'

var schema = new Schema({
    name: {type: String, required: true},
    captain: {type: String, required: true},
    mission: {type: String},
    created: {type: Date, default: Date.now()}
})

module.exports = mongoose.model(schemaName, schema)