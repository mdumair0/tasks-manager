const express = require('express');
const Task = require('../models/tasks');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/task', auth, async (req, res) => {
  const task = new Task({...req.body, userId: req.user._id});
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({userId: req.user._id});
    if (tasks.length === 0) {
      return res.status(404).send({Error: 'Task not found'});
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id, userId: req.user._id});
    if (!task) return res.status(404).send({Error: 'Task not found'});
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/task/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ['task', 'done'];
  const isValidOp = updates.every((update) => allowed.includes( update ));
  if (!isValidOp) return res.status(400).send({error: 'Invalid Update !!'});
  try {
    const task = await Task.findOne({_id: req.params.id, userId: req.user._id});
    if (!task) return res.status(404).send();
    updates.forEach(( update ) => {
      task[update] = req.body[update];
    });
    task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id: req.params.id, userId: req.user._id});
    if (!task) return res.status(404).send('No task found');
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
