var router = require('express').Router()
var Logs = require('../models/log')
var Comments = require('../models/comment')
//Logs

router.get('/api/logs', (req, res, next) => {
    Logs.find(req.query)
        .then(logs => {
            res.send(logs)
        })
        .catch(next)
})

router.get('/api/logs/:id', (req, res, next) => {
    Logs.findById(req.params.id)
        .then(log => {
            if (!log){
                return res.status(400).send({error: "Invalid Id"})
            }
            return res.send(log)
        })
        .catch(next)
})

router.get('/api/logs/:id/comments', (req, res, next) => {
    Comments.find({logid: req.params.id})
        .then(comments => {
            res.send(comments)
        })
        .catch(next)
})

router.get('/api/logs/:id/comments/:commentid', (req, res, next) => {
    Comments.find({logid: req.params.id, _id: req.params.commentid})
        .then(comment => {
            res.send(comment)
        })
        .catch(next)
})

router.post('/api/logs', (req, res, next) => {
    Logs.create(req.body)
        .then(log => {
            res.send(log)
        })
        .catch(next)
})

// router.put('/api/logs/:id', (req, res, next) => {
//     Logs.findByIdAndUpdate(req.params.id, req.body, {new: true})
//         .then(log => {
//             res.send(log)
//         })
//         .catch(next)
// })

// router.delete('/api/logs/:id', (req, res, next) => {
//     Logs.findByIdAndRemove(req.params.id)
//         .then(log => {
//             res.send({message: "Log go Burn"})
//         })
//         .catch(next)
// })

module.exports = router