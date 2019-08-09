//-File name: incident.js
//-Author: Mou Chen
//-web site name: iToDo
//-file description: This is the routes/incident.js page. this defined the method used in router.

const Incident = require('../../models/incident');

let date = require('date-and-time');
const fs  =  require('fs-extra');
var contents  =  fs.readFileSync("record.txt");
var Record    =  JSON.parse(contents);
// Incidents CRUD
// Creating
// Create a new Incident
exports.createNewIncident = async (req, res,next) => {
    const description = req.body.description;
    // console.log(time);
    let timeNow=new Date();
    let recordTime = date.format(timeNow,'YYMMDD');
    let reNo = recordTime+'-0000'+`${Record.recordNo}` ;
    Record.recordNo++;
    console.log(reNo);
    fs.writeJson('record.txt', Record, err => {
        if (err) return console.error(err)
        console.log('success!')
    })
    Incident.create({
      description:description,
      owner:req.user.username,
      priority:req.body.priority,
      customerInfo:req.body.customerInfo,
      recordNum:reNo,
      status:'New',
      date:new Date()
    },(err,incident)=>{
      if(req.body.narrative){
        incident.narratives.push({narrative:req.body.narrative,timestamp:new Date()})
          incident.save(function (err) {
              console.log(incident);
              res.redirect('/incidents');
          })
      }else{
          console.log(incident);
          res.redirect('/incidents');
      }
    })
    // const incident = await new Incident({body,owner:req.user.username}).save();
};


// Reading
// Find a Incident by it's ID
exports.findIncidentById = viewPath => async (req, res) => {
    const id = req.params.id;
    const incident = await Incident.findById(id);
    const status=['Closed','In Progress','New','Dispatched']
    res.render(viewPath, { incident,date:date,user:req.user,status:status,success:req.flash('success'),
        err:req.flash('err')});
  }; 

// Find all Incidents
exports.findAllIncidents = async (req, res) => {
    const incidents = await Incident.find();
    //console.log(incidents);
    res.render('incidents/list', { incidents ,date:date,user:req.user});
  };
  
// Updating
// Update a Incident based on it's ID
exports.updateIncidentById = async (req, res) => {
    const body = req.body;
    console.log(body);
    const id = req.params.id;
    //if users try to close the incident
    if(req.body.status=='Closed'){
        //check them if they fill in the two fields
       if(req.body.narrative && req.body.Resolution){
           const incident = await Incident.findByIdAndUpdate(id, body, {
               new: true,
               runValidators: true
           });
           incident.narratives.push({narrative:req.body.narrative,timestamp:new Date()});
           incident.save(function (err) {
               console.log(incident);
               req.flash('success', 'Your incident is closed Successfully!')
               res.redirect(`/incidents/${incident._id}`);
           })
       }else{
           // send error without filling in the Resolution before closing it
           // console.log('i am here!')
           req.flash('err', 'Please fill in your Resolution before closing it!')
           res.redirect(`/incidents/${id}/edit`);
       }

    }else{
        //check the narrative every time when they try to update
        if(req.body.narrative){
            const incident = await Incident.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true
            });
            incident.narratives.push({narrative:req.body.narrative,timestamp:new Date()});
            incident.save(function (err) {
                console.log(incident);
                req.flash('success', 'Your incident is update Successfully!')
                res.redirect(`/incidents/${incident._id}`);
            })
        }else {
            res.redirect(`/incidents/${incident._id}/edit`);
        }
    }

};

// Deleting
// Delete a incident based on it's ID
exports.deleteIncidentById = async (req, res) => {
    const id = req.params.id;
    await Incident.findByIdAndDelete(id);
    res.redirect('/incidents');
  };

