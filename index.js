const express = require ('express'); 
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv').config();


const app = express();

connectDB();
const port = process.env.PORT || 3002

app.use(express.json())

app.use("/contacts", require("./routes/contactRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});