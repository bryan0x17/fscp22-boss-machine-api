const express = require('express');
const workRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');
const errorhandler = require('errorhandler');

workRouter.param('workId', (req, res, next, workId) => {
    const work = getFromDatabaseById('work', workId);
    if (work) {
        req.workId = workId;
        next();
    } else {
        next(new Error('No such work!'));
    }
});

workRouter.get('/', (req, res, next) => {
    const workByMinion = getAllFromDatabase('work').filter((work) => work.minionId === req.minion.id);
    res.send(workByMinion);
});

workRouter.post('/', (req, res, next) => {
    const {title, description, hours} = req.body;
    if (description && title && hours) {
        const work = {
            title,
            description,
            hours: Number(hours),
            minionId: req.minion.id,
        };
        res.status(201).send(addToDatabase('work', work));
    } else {
        next(new Error('Invalid work!'));
    }
});

workRouter.put('/:workId', (req, res, next) => {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    if (updatedWork) {
        res.send(updatedWork);
    } else {
        next(new Error('Invalid fields!'));
    }
});

workRouter.delete('/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.workId);
    if (deleted) {
        res.status(204).send();
    } else {
        next(new Error('Work could not be deleted'));
    }
});

workRouter.use(errorhandler());

module.exports = workRouter;