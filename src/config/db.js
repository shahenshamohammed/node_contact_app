const mongoose = require('mongoose');
const dotenv = require('dotenv');



const connectDB = async () => {
  try {
 const connect =   await mongoose.connect(process.env.CONNECTION_STRING
    );
    console.log('MongoDB Connected',connect.connection.host,connect.connection.name);
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;