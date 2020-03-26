const express = require('express');
const connection = require("./database/connection");

// Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


// Routes
const routes = express.Router();

// Login
routes.post('/sessions', SessionController.create);


// Ong
routes.get("/ongs", OngController.index); // Get
routes.post("/ongs", OngController.create); // Create

// Profile
routes.get("/profile", ProfileController.index); // Get incidents by ong_id

// Incident
routes.get("/incidents", IncidentController.index); // Get All
routes.post("/incidents", IncidentController.create); // Create
routes.delete("/incidents/:id", IncidentController.delete); // Delete by Id



module.exports = routes;