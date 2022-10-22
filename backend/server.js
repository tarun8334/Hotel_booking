const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes
var Register = require("./routes/register");
var Hotel = require("./routes/hotel");
var Booking = require("./routes/booking");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb+srv://samarth:Simba-1234@motorq.9dizkgj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully !");
})

app.use("/register", Register);
app.use("/hotel", Hotel);
app.use("/booking", Booking);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
