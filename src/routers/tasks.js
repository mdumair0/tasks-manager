const express = require('express')
const Task = require('../models/tasks')
const router = new express.Router()


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {    
        const task = await Task.findById(req.params.id)
        if(!task) return res.status(404).send('Task not found')
        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/task', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['task', 'done']
    const isValidOp = updates.every((update) => allowed.includes( update ))
    if(!isValidOp) return res.status(400).send({error: 'Invalid Update !!'})

    try {
        const user = await Task.findById(req.params.id)
        updates.forEach(( update ) => {
            user[update] = req.body[update]
        })
        
        user.save()
        if(!user) return res.status(404).send()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send('No task found')
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router