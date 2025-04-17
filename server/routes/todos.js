const express = require('express');
const Todo = require('../models/todo');
const { authenticate, authorizeRole } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const { title, description, dueDate, category } = req.body;

  if (!title || title.length > 100) return res.status(400).json({ error: 'Title is required and max 100 chars' });

  try {
    const todo = new Todo({
      title,
      description,
      dueDate,
      category,
      user: req.user.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user.userId };
  const todos = await Todo.find(filter);
  res.json(todos);
});

router.put('/:id', authenticate, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.sendStatus(404);
  if (req.user.role !== 'admin' && todo.user.toString() !== req.user.userId) return res.sendStatus(403);

  Object.assign(todo, req.body);
  await todo.save();
  res.json(todo);
});

router.delete('/:id', authenticate, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.sendStatus(404);
  if (req.user.role !== 'admin' && todo.user.toString() !== req.user.userId) return res.sendStatus(403);

  await todo.remove();
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
