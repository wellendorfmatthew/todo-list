const express = require('express');
const {
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
    createTodo
} = require('../controllers/todoControllers');

const router = express.Router();

router.get('/', getTodos);

router.get('/:id', getTodo);

router.post('/', createTodo);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = router;