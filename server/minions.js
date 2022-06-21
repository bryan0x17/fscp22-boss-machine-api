const express = require('express');
const minionsRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');
const errorhandler = require('errorhandler');

minionsRouter.param('minionId', (req, res, next, minionId) => {
    const minion = getFromDatabaseById('minions', minionId);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        next(new Error('Invalid minion ID'));
    }
    
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const {name, title, salary} = req.body;
    if (name && title && salary) {
        res.status(201).send(addToDatabase('minions', {name, title, salary: Number(salary)}));
    } else {
        next(new Error('Invalid minion!'));
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        next(new Error('Invalid fields!'));
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.minion.id);
    if (deleted) {
        res.status(204).send();
    } else {
        next(new Error('Minion could not be deleted'));
    }
});

minionsRouter.use(errorhandler());

module.exports = minionsRouter;