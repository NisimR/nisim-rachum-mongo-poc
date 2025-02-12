const connectDB = require("./db");
const { displayItems, addItem, updateItem, deleteItem } = require("./operations");
const readline = require("readline-sync");

//const createDefaultItems = require("./defaultData");
//await createDefaultItems();

async function main() {
    await connectDB();
    console.log("📌 Welcome to Square Manager!");

    while (true) {
        console.log("\n1. Display Squares");
        console.log("2. Add Square");
        console.log("3. Update Square");
        console.log("4. Delete Square");
        console.log("5. Exit");

        const choice = readline.questionInt("Choose an option: ");

        switch (choice) {
            case 1:
                await displayItems();
                break;
            case 2:
                await addItem();
                break;
            case 3:
                await updateItem();
                break;
            case 4:
                await deleteItem();
                break;
            case 5:
                console.log("👋 Goodbye!");
                process.exit();
            default:
                console.log("❌ Invalid choice, try again.");
        }
    }
}

main();
