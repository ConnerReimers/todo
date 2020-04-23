const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo-controller');
const checkAuth = require('../middleware/check-auth');

router.use(checkAuth)

router.get('/:userId', todoController.getUserTodos)
router.post('/', todoController.createTodo)
router.delete('/:todoId', todoController.deleteTodo)

module.exports = router;