//controller for expenses

var express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const User = require('../models/user');
const Expense = require('../models/expense');
var router = express.Router();
const upload = multer({ dest: 'uploads/' });


//GET all expenses for a user

router.get('/:email', async (req, res, next) => {
    try {
        const expenses = await Expense.find({ email: req.params.email })
        .then((expenses)=>{
            if(expenses && expenses.length>0){
                res.send({message: "Expenses fetched successfully",status:"success", data: expenses})
            }
            else{
                res.send({message: "No expenses found",status:"error",data:null})
            }
        })
    } catch (error) {
        res.send({message: "Internal error",status:"error",data:error})

    }
});

//POST a new expense for a user

router.post('/addExpense', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send({ message: 'User not found', status: 'error', data: null });
        }
        const expense = new Expense({
            data: Date.now(),
            expenseName: req.body.expenseName,
            description: req.body.description,
            amount: req.body.amount,
            category: req.body.category,
            email: req.body.email
        });
        await expense.save();
        res.send({ message: 'Expense added successfully', status: 'success', data: expense });
    } catch (error) {
        res.send({ message: 'Internal error', status: 'error', data: error });
    }
});

router.post('/uploadcsv', upload.single('csvFile'), (req, res) => {
    const filePath = req.file.path;
    const expenses = [];
    if (!req.body.email) {
      return res.status(400).json({ message: 'Email is required', status: 'error' });
    }
  
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        expenses.push({
            email: req.body.email,
            expenseName: row.expenseName,
            price: parseFloat(row.price),
            category: row.category,
            date: new Date(row.date),
            description: row.description
        });
      })
      .on('end', async () => {
        try {
          await Expense.insertMany(expenses);
          fs.unlinkSync(filePath); // Remove the uploaded file
          res.json({ message: 'CSV data imported successfully',status:"success" });
        } catch (error) {
          console.error('Error importing CSV data:', error);
          res.status(500).json({ message: 'Failed to import CSV data',status:"error" });
        }
      });
  });



module.exports = router