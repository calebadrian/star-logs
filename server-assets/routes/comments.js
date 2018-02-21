var router = require('express').Router()
var Comments = require('../models/comment')

//Comments

router.get('/api/comments', (req, res, next) => {
    Comments.find(req.query)
        .then(comments => {
            res.send(comments)
        })
        .catch(next)
})

router.get('/api/comments/:id', (req, res, next) => {
    Comments.findById(req.params.id)
        .then(comment => {
            if (!comment){
                return res.status(400).send({error: "Invalid Id"})
            }
            return res.send(comment)
        })
        .catch(next)
})

router.post('/api/comments', (req, res, next) => {
    Comments.create(req.body)
        .then(comment => {
            res.send(comment)
        })
        .catch(next)
})

router.put('/api/comments/:id', (req, res, next) => {
    Comments.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(comment => {
            res.send(comment)
        })
        .catch(next)
})

router.delete('/api/comments/:id', (req, res, next) => {
    Comments.findByIdAndRemove(req.params.id)
        .then(comment => {
            res.send({message: "Scissor beats Comment"})
        })
        .catch(next)
})

module.exports = router