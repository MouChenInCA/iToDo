//-File name: users.js
//-Author: Mou Chen
//-web site name: iToDo
//-file description: This is the user.js page. this manage the routes between pages related to user information.

var express = require('express');
var users = require('./controllers/userController');
var router = express.Router();

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.redirect('/login');
};
router.post('*', requireAuth); // Protect ALL POST routes
// Require auth on every route below this router
router.use(requireAuth);


/* GET users info. */
router.get('/:id',(req, res, next)=> {

  res.render('users/userInfo');
});


// Render edit form (GET)
router.get('/:id/edit', users.findUserById('users/edit'));

// Handle edit form (POST)
router.post('/:id/edit', users.updateUserInfoById);

// Delete a user (GET)
router.get('/:id/delete', users.deleteUserById);

module.exports = router;
