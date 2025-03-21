const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
},
  name: {
    type: String,
    required: [true,"Please add contact name"],
  },
  email: {
    type: String,
    required:[true,"please add email"]
  },
  phone: {
    type: String,
    required: [true,
        "please add phone number"
    ],
  }},
 {
    timestamps: true,
 }
);

module.exports = mongoose.model('Contact', contactSchema);