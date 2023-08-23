const Todo = require('../models/ToDo');
const mongoose = require('mongoose');

// Get all todo items
const getTodos = async (req, res, next) => {
    const todos = await Todo.find({}).sort({createdAt: -1});

    res.status(200).json(todos);
}

const getTodo = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'No such item'});
    }
    const todo = await Todo.findById(id);

    if (!todo) {
        return res.status(404).json({error: 'No such item'});
    }

    res.status(200).json(todo);
}

const createTodo = async (req, res, next) => {
    const { title, complete } = req.body;

    try {
        const todo = await Todo.create({title, complete});
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const updateTodo = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'No such item'});
    }
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    if (!todo) {
        return res.status(404).json({error: 'No such item'});
    }

    res.status(200).json(todo);
}

const deleteTodo = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'No such item'});
    }
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
        return res.status(404).json({error: 'No such item'});
    }

    res.status(200).json(todo);
}

module.exports = {
    deleteTodo, 
    createTodo,
    updateTodo,
    getTodo,
    getTodos
}