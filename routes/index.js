var express = require('express');
var incidents = require('./controllers/incidents');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'iToDo' });
});

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect('/login');
};
router.post('*', requireAuth); // Protect ALL POST routes

// Render create form (GET)
// create new incident from for authed users
router.get('/incidents/new', requireAuth, (req, res) =>
  res.render('incidents/create')
);

// Require auth on every route below this router
router.use(requireAuth);

// List all incidents (GET)
router.get('/incidents', incidents.findAllIncidents);
// List a specific incidents (GET)
router.get('/incidents/:id', incidents.findIncidentById('incidents/details'));

// Handle create form (POST)
router.post('/incidents/new', incidents.createNewIncident);
// Render edit form (GET)
router.get('/incidents/:id/edit', incidents.findIncidentById('incidents/edit'));

// Handle edit form (POST)
router.post('/incidents/:id/edit', incidents.updateIncidentById);
// Delete a incidents (GET)
router.get('/incidents/:id/delete', incidents.deleteIncidentById);

module.exports = router;
