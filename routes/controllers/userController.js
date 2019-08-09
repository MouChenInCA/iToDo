//-File name: userController.js
//-Author: Mou Chen
//-web site name: iToDo
//-file description: This is the routes/user.js page. this defined the method used in router.



const User = require('../../models/user');

// user info modification

// Reading
// Find a user by it's ID
exports.findUserById =  viewPath => async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.render(viewPath, { user });
};

// Updating
// Update a user info based on it's ID
exports.updateUserInfoById = async (req, res) => {
  const email = req.body.email;
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, {email:email}, {
    new: true,
    runValidators: true
  });
  res.redirect(`/`);
};

// Deleting
// Delete a user info
exports.deleteUserById = async (req, res) => {
  const id = req.params.id;
  await user.findByIdAndDelete(id);
  req.session.destroy(err => {
    res.redirect('/register');
  })
};


