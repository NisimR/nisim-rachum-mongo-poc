const Square = require("./models/square");

async function createDefaultItems() {
    const count = await Square.countDocuments();
    if (count === 0) {
        await Square.insertMany([
            { length: 10, color: "Red", isFilled: true, text: "A", textColor: "White" },
            { length: 15, color: "Blue", isFilled: false, text: "B", textColor: "Black" },
            { length: 20, color: "Green", isFilled: true, text: "C", textColor: "Yellow" }
        ]);
        console.log("✅ Default squares added.");
    }
}

module.exports = createDefaultItems;
