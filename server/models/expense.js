// models/expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  expenseName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = mongoose.model.Expense || Expense;
