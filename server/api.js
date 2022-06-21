const express = require('express');
const ideasRouter = require('./ideas');
const minionsRouter = require('./minions');
const apiRouter = express.Router();

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);


module.exports = apiRouter;
