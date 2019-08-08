const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const narrativeSchema = new Schema({
  timestamp: String,
  narrative: String,
});

const incidentSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  // owner:{Type:mongoose.Schema.Types.ObjectId,ref:'User'},
  owner:String,
  priority: String,
  customerInfo: String,
  // priority: {
  //   type: String,
  //   required: true
  // },
  // customerInfo: {
  //   type: String,
  //   required: true
  // },
  date: Date,
  status: String,
  narratives:[{
      timestamp: Date,
      narrative: String,
  }],
  recordNum: String,
  Resolution:String
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;