var router = require('express').Router()
var Users = require('../models/user')
var Ships = require('../models/ship')
var Logs = require('../models/log')

//Users

router.get('/api/users', (req, res, next) => {
    Users.find(req.query)
        .then(users => {
            res.send(users)
        })
        .catch(next)
})

router.get('/api/users/:id', (req, res, next) => {
    Users.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(400).send({ error: "Invalid Id" })
            }
            return res.send(user)
        })
        .catch(next)
})

router.post('/api/users', (req, res, next) => {
    Users.create(req.body)
        .then(user => {
            res.send(user)
        })
        .catch(next)
})


router.post('/api/users/:userid/:create', (req, res, next) => {
    Users.findById(req.params.userid)
        .then(user => {
            if (user.role != 'Admiral') {
                return res.status(401).send({ error: "Access Denied" })
            }
            if (req.params.create == 'ships') {
                Ships.create(req.body)
                    .then(ship => {
                        res.send(ship)
                    })
                    .catch(next)
            } else if (req.params.create == 'users') {
                Users.create(req.body)
                    .then(user => {
                        res.send(user)
                    })
                    .catch(next)
            }
        })
        .catch(next)
})



router.put('/api/users/:userid/:edit/:id', (req, res, next) => {
    Users.findById(req.params.userid)
        .then(user => {
            if (req.params.edit == 'logs') {
                Logs.findOneAndUpdate({ _id: req.params.id, createdBy: req.params.userid }, req.body, { new: true })
                    .then(log => {
                        if (log) {
                            return res.send({ message: "Successfully updated log", data: log })
                        } else {
                            return res.status(400).send({ error: "Bad Request" })
                        }
                    })
                    .catch(next)
            }
            if (req.params.edit == 'users') {
                if (user.role != 'Admiral') {
                    return res.status(401).send({ error: "Access Denied" })
                }
                Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
                    .then(user => {
                        res.send(user)
                    })
                    .catch(next)
            } else if (req.params.edit == 'ships') {
                if (user.role != 'Admiral') {
                    return res.status(401).send({ error: "Access Denied" })
                }
                Ships.findByIdAndUpdate(req.params.id, req.body, { new: true })
                    .then(ship => {
                        res.send(ship)
                    })
                    .catch(next)
            }
        })
        .catch(next)
})

router.delete('/api/users/:userid/:itemdelete/:id', (req, res, next) => {
    Users.findById(req.params.userid)
        .then(user => {
            if (req.params.itemdelete == 'logs') {
                Logs.findOneAndRemove({ _id: req.params.id, createdBy: req.params.userid }, req.body)
                    .then(log => {
                        if (log){
                            res.send({message: "Successfully deleted log"})
                        } else {
                            res.status(400).send({message: "Bad Request"})
                        }
                    })
                    .catch(next)
            } else if (req.params.itemdelete == 'ships' || req.params.itemdelete == 'users'){
                if (user.role == 'Grunt') {
                    res.status(401).send({ error: "Access Denied" })
                } else if (user.role == 'Captain' && req.params.itemdelete != 'ships') {
                    Users.findOneAndRemove({ _id: req.params.id, role: 'Grunt' })
                        .then(deleteduser => {
                            res.send({ message: "Successfully deleted user" })
                        })
                        .catch(next)
                } else if (user.role == 'Admiral') {
                    if (req.params.itemdelete == 'users') {
                        Users.findByIdAndRemove(req.params.id)
                            .then(deleteduser => {
                                res.send({ message: "Successfully deleted user" })
                            })
                            .catch(next)
                    } else if (req.params.itemdelete == 'ships') {
                        Ships.findByIdAndRemove(req.params.id)
                            .then(ship => {
                                res.send({ message: "Successfully deleted ship" })
                            })
                            .catch(next)
                    }
                }
            }
        })
})

module.exports = router