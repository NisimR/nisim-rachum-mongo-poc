const mongoose = require("mongoose");

// יצירת סכמת Square
const squareSchema = new mongoose.Schema({
    length: { type: Number, required: true },  // אורך צלע הריבוע
    color: { type: String, required: true },   // צבע הריבוע
    isFilled: { type: Boolean, required: true }, // האם מלא?
    text: { type: String, required: false },   // טקסט בתוך הריבוע
    textColor: { type: String, required: false } // צבע הטקסט
});

// יצירת מודל
const Square = mongoose.model("Square", squareSchema);

module.exports = Square;
