const mongoose = require('mongoose');
require('dotenv').config();

const uri = "mongodb+srv://smita:smi12345@cluster0.w5g7meb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully to MongoDB server");
    
  })
  .catch(err => {
    console.error("Connection error", err);

  });

  module.exports = mongoose;