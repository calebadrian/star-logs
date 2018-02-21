var router = require('express').Router()
var Ships = require('../models/ship')
var Logs = require('../models/log')
var Comments = require('../models/comment')

//Ships

router.get('/api/ships', (req, res, next) => {
    Ships.find(req.query)
        .then(ships => {
            res.send(ships)
        })
        .catch(next)
})

router.get('/api/ships/:id', (req, res, next) => {
    Ships.findById(req.params.id)
        .then(ship => {
            if (!ship){
                return res.status(400).send({error: "Invalid Id"})
            }
            return res.send(ship)
        })
        .catch(next)
})

//Gives us all logs associated with one ship
router.get('/api/ships/:id/logs', (req, res, next) => {
    Logs.find({shipId: req.params.id})
        .then(logs => {
            res.send(logs)
        })
        .catch(next)
})

//Gives us one log associated with one ship
router.get('/api/ships/:id/logs/:logid', (req, res, next) => {
    Logs.find({shipId: req.params.id, _id: req.params.logid})
        .then(log => {
            res.send(log)
        })
        .catch(next)
})

//Gives us all comments from one ship
router.get('/api/ships/:id/comments', (req, res, next) => {
    Comments.find({shipId: req.params.id})
        .then(comments => {
            res.send(comments)
        })
        .catch(next)
})

//Gives us all comments from one log from one ship
router.get('/api/ships/:id/logs/:logid/comments', (req, res, next) => {
    Comments.find({shipId: req.params.id, logId: req.params.logid})
        .then(comments => {
            res.send(comments)
        })
        .catch(next)
})

//Gives us one comment from one log from one ship
router.get('/api/ships/:id/logs/:logid/comments/:commentid', (req, res, next) => {
    Comments.find({shipId: req.params.id, logId: req.params.logid, _id: req.params.commentid})
        .then(comment => {
            res.send(comment)
        })
        .catch(next)
})

router.post('/api/ships', (req, res, next) => {
    res.status(401).send('<img src="https://media.giphy.com/media/10JMv1m2VeIY92/giphy.gif">')
})

router.put('/api/ships/:id', (req, res, next) => {
    res.status(401).send('<img src="https://media.giphy.com/media/10JMv1m2VeIY92/giphy.gif">')
})

router.delete('/api/ships/:id', (req, res, next) => {
    res.status(401).send('<img src="https://media.giphy.com/media/10JMv1m2VeIY92/giphy.gif">')
})

module.exports = router