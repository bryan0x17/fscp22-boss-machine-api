const express = require('express');
const meetingsRouter = express.Router();
const {getAllFromDatabase, addToDatabase, createMeeting, deleteAllFromDatabase} = require('./db');
const errorhandler = require('errorhandler');

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});


meetingsRouter.post('/', (req, res, next) => {
    const meeting = createMeeting();
    const created = addToDatabase('meetings', meeting);

    if (created) {
        res.status(201).send(created);
    } else {
        next(new Error('Could not create meetings!'));
    }
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');
    if (deleted.length === 0) {
        res.status(204).send();
    } else {
        next(new Error('Could not delete meetings!'));
    }
});

meetingsRouter.use(errorhandler());

module.exports = meetingsRouter;