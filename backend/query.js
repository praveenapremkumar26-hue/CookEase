const db = require('./database');

console.log("\n--- CookEase Database Viewer ---\n");

db.serialize(() => {
    db.all(`SELECT * FROM users;`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }

        if (rows.length === 0) {
            console.log("No users found in the database yet.");
        } else {
            console.log(`Found ${rows.length} users:`);
            console.table(rows); // Prints a nice ASCII table in the terminal!
        }
    });
});
