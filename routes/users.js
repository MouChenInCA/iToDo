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

// router.get('/:id/edit', (req,res,next)=>{

//   users.findUserById('users/userInfo'
// });

// Render edit form (GET)
router.get('/:id/edit', users.findUserById('users/edit'));

// Handle edit form (POST)
router.post('/:id/edit', users.updateUserInfoById);

module.exports = router;
