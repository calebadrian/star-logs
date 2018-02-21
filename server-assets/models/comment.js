var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Comment'

var schema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    commentBody: {type: String, required: true},
    logId: {type: ObjectId, ref: 'Log', required: true},
    shipId: {type: ObjectId, ref: 'Ship', required: true}
})

module.exports = mongoose.model(schemaName, schema)