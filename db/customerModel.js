const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  planType: {
    type: String,
    required: [true, 'Plan type is required'],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: Map,
    of: new mongoose.Schema({
      body: String,
      date: { type: Date, default: Date.now },
    }),
  },
});

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    unique: [true, 'Email Exists'],
  },
  plans: [PlanSchema],
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Map,
      of: new mongoose.Schema({
        body: String,
        date: { type: Date, default: Date.now },
      }),
    },
  ],
});

module.exports =
  mongoose.model.Customers || mongoose.model('Customers', CustomerSchema);
