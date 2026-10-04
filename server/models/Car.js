const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  brand:        { type: String, required: true },
  category:     { type: String, required: true },
  priceRange:   { type: String, required: true },
  engine:       { type: String, required: true },
  transmission: { type: String, required: true },
  fuel:         { type: String, required: true },
  mileage:      String,
  features:     [String],
  description:  { type: String, required: true },
  imageUrl:     { type: String, default: '' },
});

module.exports = mongoose.model('Car', carSchema);
