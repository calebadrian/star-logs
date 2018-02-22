var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Log'

var schema = new Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    createdBy: {type: ObjectId, ref: 'User', required: true},
    startDate: {type: Date, default: Date.now()},
    endDate: {type: Date},
    shipId: {type: ObjectId, ref: 'Ship', required: true}
})

module.exports = mongoose.model(schemaName, schema)