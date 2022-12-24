const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
       const user = await User.findById(_id)
       if(!user) return res.status(404).send()
       res.send(user)
    } catch(e) {
        res.send(500).send()        
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    console.log(req.params.id, req.body)

    const updates = Object.keys(req.body)
    const allowed = ['name', 'email', 'password', 'age']
    const isValidOp = updates.every((update) => allowed.includes( update ))
    if(!isValidOp) return res.status(400).send({error: 'Invalid Update !!'})

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        user.save()
        
        if(!user) return res.status(404).send()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send("No User found")
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router