const readline = require("readline-sync");
const Square = require("./models/square");

async function displayItems() {
    const items = await Square.find(); // שליפת כל הריבועים מהמסד נתונים
    console.table(items.map(item => item.toObject())); // המרת המסמכים לאובייקטים רגילים
}



// הוספת ריבוע חדש
async function addItem() {
    const length = readline.questionInt("Enter square length: ");
    const color = readline.question("Enter color: ");
    const isFilled = readline.keyInYN("Is it filled? ");
    const text = readline.question("Enter text (or leave blank): ");
    const textColor = text ? readline.question("Enter text color: ") : null;

    const newSquare = new Square({ length, color, isFilled, text, textColor });
    await newSquare.save();cd 
    console.log("✅ Square added!");
}

// עדכון ריבוע
async function updateItem() {
    const items = await Square.find();

    // ✅ הצגת הנתונים בצורה נכונה
    console.log("\n📌 Select a Square to Update:");
    items.forEach((item, index) => {
        console.log(`${index + 1}. ID: ${item._id}, Length: ${item.length}, Color: ${item.color}, Is Filled: ${item.isFilled}`);
    });

    const readline = require("readline-sync");
    const indexToUpdate = readline.questionInt("\nEnter the number of the square to update: ") - 1;

    if (indexToUpdate < 0 || indexToUpdate >= items.length) {
        console.log("❌ Invalid selection!");
        return;
    }

    const id = items[indexToUpdate]._id;
    const newColor = readline.question("Enter new color: ");

    await Square.findByIdAndUpdate(id, { color: newColor });
    console.log("✅ Square updated!");
}

// מחיקת ריבוע
async function deleteItem() {
    const items = await Square.find();

    if (items.length === 0) {
        console.log("\n❌ No squares found to delete.");
        return;
    }

    // ✅ מציג את הנתונים בדיוק כמו ב-Display Squares
    console.table(items.map(item => ({
        ID: item._id.toString(), // ממיר את ה-ObjectId למחרוזת
        Length: item.length,
        Color: item.color,
        IsFilled: item.isFilled,
        Text: item.text || "N/A",
        TextColor: item.textColor || "N/A"
    })));

    const readline = require("readline-sync");
    const idToDelete = readline.question("Enter the ID of the square to delete: ");

    const selectedItem = await Square.findById(idToDelete);
    if (!selectedItem) {
        console.log("❌ Invalid ID! Square not found.");
        return;
    }

    await Square.findByIdAndDelete(idToDelete);
    console.log("✅ Square deleted successfully!");
}


module.exports = { displayItems, addItem, updateItem, deleteItem };
