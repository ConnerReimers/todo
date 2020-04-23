const mongoose = require('mongoose');
const fs = require('fs');
const Todo = require('../models/todo');
const User = require('../models/user');
const HttpError = require('../models/http-error');


const getUserTodos = async (req, res, next) => {
    const userId = req.params.userId;
    let userTodos;
    try {
        userTodos = await User.findById(userId).populate('todos')
    } catch(err) {
        const error = new HttpError('Sorry, could not find the users todos')
        console.log('errrrr')
        return next(error)
    };

    if(!userTodos || userTodos.length === 0) {
        const error = new HttpError('Sorry, could not find the users todos')
        console.log('ezzzzzz')

        return next(error);

    } else {
        res.json({todo: userTodos.todos.map(todo => todo.toObject({ getters: true}))})
    }
}


const createTodo = async (req, res, next) => {
    const { task, urgency, creator } = req.body;
    
    const createdTodo = new Todo({
        task,
        urgency,
        creator
    });

    let user;
    try {
        user = await User.findById(creator)
    }
    catch (err) {
        const eror = new HttpError('Sorry many could not find your user ID');
        return next(eror);
    }

    if(!user) {
        const eror = new HttpError('Sorry man... could not find your user ID');
        return next(eror);
    }

    try {
        const sesh = await mongoose.startSession();
        sesh.startTransaction();
        await createdTodo.save({ session: sesh})
        user.todos.push(createdTodo);
        await user.save({ session: sesh})
        await sesh.commitTransaction();
    }
    catch (err) {
        return next(err)
    }

    res.status(201).json({todo: createdTodo})

}

const deleteTodo = async (req, res, next) => {
    const todoId = req.params.todoId;
    let todo;

    try {
        todo = await Todo.findById(todoId).populate('creator');
    } catch(err) {
        const error = new HttpError('Could not delete. aw.', 500)
        return next(error);
    }

    if(!todo) {
        const error = new HttpError('Could not delete. hg.', 500)
        return next(error);
    }

    if (todo.creator.id !== req.userData.userId) {
        const error = new HttpError('Could not delete. you not allowed.', 500)
        return next(error);
    }

    try {
        const sesh = await mongoose.startSession();
        sesh.startTransaction();
        await todo.remove({session: sesh});
        todo.creator.todos.pull(todo);
        await todo.creator.save({session: sesh});
        await sesh.commitTransaction();

    } catch(err) {
        const error = new HttpError('Could not delete. ds.', 500)
        return next(error);
    }
    res.status(200).json({message: 'Deleted the Todo'})
}

exports.createTodo = createTodo
exports.getUserTodos = getUserTodos
exports.deleteTodo = deleteTodo