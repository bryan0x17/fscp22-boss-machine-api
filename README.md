# Boss Machine

## Description

This project involves building a work-management system API using Express.js. The API has four main endpoints handling employees ("minions"), ideas, meetings, and work (assigned per employee). The project front-end is supplied by Codecademy, but the back-end was built from scratch using the requirements as set out below.

## Requirements

#### Routes Required

- `/api/minions`
  - GET /api/minions to get an array of all minions.
  - POST /api/minions to create a new minion and save it to the database.
  - GET /api/minions/:minionId to get a single minion by id.
  - PUT /api/minions/:minionId to update a single minion by id.
  - DELETE /api/minions/:minionId to delete a single minion by id.
- `/api/ideas`
  - GET /api/ideas to get an array of all ideas.
  - POST /api/ideas to create a new idea and save it to the database.
  - GET /api/ideas/:ideaId to get a single idea by id.
  - PUT /api/ideas/:ideaId to update a single idea by id.
  - DELETE /api/ideas/:ideaId to delete a single idea by id.
- `/api/meetings`
  - GET /api/meetings to get an array of all meetings.
  - POST /api/meetings to create a new meeting and save it to the database.
  - DELETE /api/meetings to delete _all_ meetings from the database.
- `/api/minions/:minionId/work`
  - GET /api/minions/:minionId/work to get an array of all work for the specified minon.
  - POST /api/minions/:minionId/work to create a new work object and save it to the database.
  - PUT /api/minions/:minionId/work/:workId to update a single work by id.
  - DELETE /api/minions/:minionId/work/:workId to delete a single work by id.

## Technologies

The API is built using Node, npm, and Express. It also uses some express libraries, such as CORS, errorhandler, body parser, and morgan.

## Deployment

The app can be run on your machine by downloading the entire project folder. Then run 
```npm install```
in the root folder, followed by 
```npm run start```
The API should now be running on port 4001. You can open the front-end app by opening index.html in a browser, or you can simply communicate with the API directly (e.g. via Postman).