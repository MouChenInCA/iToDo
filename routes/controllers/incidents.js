const Incident = require('../../models/incident');
const moment=require('moment');
// Incidents CRUD
// Creating
// Create a new Incident
exports.createNewIncident = async (req, res) => {
    const description = req.body.description;
    let time=new Date();
    let time2= moment(time).format("YYMMDD");
    console.log(time);

    Incident.create({
      description:description,
      //owner:req.user.username,
      ownerId:req.user._id
    },(err,incident)=>{

      console.log(incident);
      res.redirect(`/incidents/${incident._id}`);
    })
    // const incident = await new Incident({body,owner:req.user.username}).save();
    
  };


// Reading
// Find a Incident by it's ID
exports.findIncidentById = viewPath => async (req, res) => {
    const id = req.params.id;
    const incident = await Incident.findById(id);
    res.render(viewPath, { incident });
  }; 

// Find all Incidents
exports.findAllIncidents = async (req, res) => {
    const incidents = await Incident.find();
    console.log(incidents);
    res.render('incidents/list', { incidents });
  };
  
// Updating
// Update a Incident based on it's ID
exports.updateIncidentById = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const incident = await Incident.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    res.redirect(`/incidents/${incident._id}`);
  };

// Deleting
// Delete a incident based on it's ID
exports.deleteIncidentById = async (req, res) => {
    const id = req.params.id;
    await Incident.findByIdAndDelete(id);
    res.redirect('/incidents');
  };

