const readline = require("readline-sync");
const Square = require("./models/square");

// הצגת כל הריבועים
async function displayItems() {
    const items = await Square.find();
    console.table(items);
}

// הוספת ריבוע חדש
async function addItem() {
    const length = readline.questionInt("Enter square length: ");
    const color = readline.question("Enter color: ");
    const isFilled = readline.keyInYN("Is it filled? ");
    const text = readline.question("Enter text (or leave blank): ");
    const textColor = text ? readline.question("Enter text color: ") : null;

    const newSquare = new Square({ length, color, isFilled, text, textColor });
    await newSquare.save();
    console.log("✅ Square added!");
}

// עדכון ריבוע
async function updateItem() {
    const items = await Square.find();
    console.table(items);
    const id = readline.question("Enter ID to update: ");
    const newColor = readline.question("Enter new color: ");

    await Square.findByIdAndUpdate(id, { color: newColor });
    console.log("✅ Square updated!");
}

// מחיקת ריבוע
async function deleteItem() {
    const items = await Square.find();
    console.table(items);
    const id = readline.question("Enter ID to delete: ");

    await Square.findByIdAndDelete(id);
    console.log("✅ Square deleted!");
}

module.exports = { displayItems, addItem, updateItem, deleteItem };
