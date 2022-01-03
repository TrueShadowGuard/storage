const Schema = require('../db').Schema

const CounterSchema = {
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 0
  }
};

const Counter = Schema("counters", CounterSchema);

module.exports = Counter;
