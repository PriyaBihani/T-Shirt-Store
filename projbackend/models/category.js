const mongoose = require('mongoose');

// Summer And Winter Collection in this project but may be bicycle and Accessories,  May be female male

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
