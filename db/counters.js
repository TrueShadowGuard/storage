const Counter = require("./collections/CounterCollection");

const getNextCounterValue = (name) => {
  const counter = Counter.find({name});
  counter.data.value++;
  counter.save();
  return counter.data.value;
}

module.exports = getNextCounterValue;
