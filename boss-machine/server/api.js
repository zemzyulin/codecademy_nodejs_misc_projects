const express = require('express');
const apiRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, 
    deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

// Minions routes
apiRouter.param('minionId', (req, res, next, id) => {
    if (isNaN(Number(id))) {
        res.status(404).send('Invalid Id')
    } 
    if (getFromDatabaseById('minions', id)) {
        req.minionId = id;
        next();
    } else {
        res.status(404).send('Invalid Id');
    }
});
apiRouter
    .get('/minions', (req, res, next) => { res.send(getAllFromDatabase('minions')); })
    .post('/minions', (req, res, next) => { res.status(201).send(addToDatabase('minions', req.body)); })
    .get('/minions/:minionId', (req, res, next) => { res.send(getFromDatabaseById('minions', req.minionId)); })
    .put('/minions/:minionId', (req, res, next) => {
        updateInstanceInDatabase('minions', req.body);
        res.send(getFromDatabaseById('minions', req.minionId)); })
    .delete('/minions/:minionId', (req, res, next) => { 
        res.status(204).send(deleteFromDatabasebyId('minions', req.params.minionId)); });

// Ideas routes
apiRouter.param('ideaId', (req, res, next, id) => {
    if (isNaN(Number(id))) {
        res.status(404).send('Invalid Id')
    } 
    if (getFromDatabaseById('ideas', id)) {
        req.ideaId = id;
        next();
    } else {
        res.status(404).send('Invalid Id');
    }
});
apiRouter
    .get('/ideas', (req, res, next) => { res.send(getAllFromDatabase('ideas')); })
    .post('/ideas', checkMillionDollarIdea, (req, res, next) => { res.status(201).send(addToDatabase('ideas', req.body)); })
    .get('/ideas/:ideaId', (req, res, next) => { res.send(getFromDatabaseById('ideas', req.ideaId)); })
    .put('/ideas/:ideaId', checkMillionDollarIdea, (req, res, next) => {
        updateInstanceInDatabase('ideas', req.body);
        res.send(getFromDatabaseById('ideas', req.ideaId)); })
    .delete('/ideas/:ideaId', (req, res, next) => { res.status(204).send(deleteFromDatabasebyId('ideas', req.ideaId)); });

// Meetings routes
apiRouter
    .get('/meetings', (req, res, next) => { res.send(getAllFromDatabase('meetings')); })
    .post('/meetings', (req, res, next) => {
        const meeting = createMeeting();
        addToDatabase('meetings', meeting);
        res.status(201).send(meeting); })
    .delete('/meetings', (req, res, next) => { res.status(204).send(deleteAllFromDatabase('meetings')); });

// Work routes
apiRouter.param('workId', (req, res, next, id) => {
    if (isNaN(Number(id))) {
        res.status(404).send('Invalid Id')
    } 
    if (getFromDatabaseById('work', id)) {
        req.workId = id;
        next();
    } else {
        res.status(404).send('Invalid Id');
    }
});

apiRouter
    .get('/minions/:minionId/work', (req, res, next) => {
        const work = getAllFromDatabase('work').filter(element => element.minionId === req.minionId);
        res.send(work); })
    .post('/minions/:minionId/work', (req, res, next) => {
        const work = req.body;
        work.minionId = req.minionId;
        res.status(201).send(addToDatabase('work', work)); })
    .put('/minions/:minionId/work/:workId', (req, res, next) => {
        if (req.params.minionId !== req.body.minionId) { res.status(400).send(); }
        updateInstanceInDatabase('work', req.body);
        res.send(getFromDatabaseById('work', req.workId)); })
    .delete('/minions/:minionId/work/:workId', (req, res, next) => {
        res.status(204).send(deleteFromDatabasebyId('work', req.workId)); });

module.exports = apiRouter;
