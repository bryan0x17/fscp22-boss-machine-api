const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const errorhandler = require('errorhandler');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, ideasId) => {
    const idea = getFromDatabaseById('ideas', ideasId);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        next(new Error('Invalid idea ID'));
    }

});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    if (name && description && numWeeks && weeklyRevenue) {
        const idea = {
            name,
            description,
            numWeeks: Number(numWeeks),
            weeklyRevenue: Number(weeklyRevenue),
        };
        res.status(201).send(addToDatabase('ideas', idea));
    } else {
        next(new Error('Invalid idea!'));
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea) {
        res.send(updatedIdea);
    } else {
        next(new Error('Invalid fields!'));
    }


});


ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.idea.id);
    if (deleted) {
        res.status(204).send();
    } else {
        next(new Error('Idea could not be deleted'));
    }
});



ideasRouter.use(errorhandler());

module.exports = ideasRouter;