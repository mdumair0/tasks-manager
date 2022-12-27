const express = require('express');
const Task = require('../models/tasks');
const auth = require('../middleware/auth');
const router = new express.Router();

// Create Task
router.post('/task', auth, async (req, res) => {
  const task = new Task({...req.body, userId: req.user._id});
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Retrieve Tasks
// GET /tasks?done=true
// GET /tasks?limit=3&skip=2
router.get('/tasks', auth, async (req, res) => {
  try {
    const sort = {};
    if (req.query.done) {
      obj = {userId: req.user._id, done: req.query.done};
    } else {
      obj = {userId: req.user._id};
    };

    if (req.query.sortBy) {
      const part = req.query.sortBy.split(':');
      sort[part[0]] = part[1] === 'desc' ? -1 : 1;
    } else console.log('sort, req.query.sortBy');

    const tasks = await Task.find(obj)
        .skip(Number(req.query.skip) || 0)
        .limit(Number(req.query.limit) || 0)
        .sort(sort);

    if (tasks.length === 0) {
      return res.status(404).send({Error: 'Task not found'});
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Retrieve One Task By Id
router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task) return res.status(404).send({Error: 'Task not found'});
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update Task By Id
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

// Delete Task
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
