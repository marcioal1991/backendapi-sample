const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./banco.db');

db.serialize(function () {
    db.run("CREATE TABLE cat (name TEXT)");

    const stmt = db.prepare("INSERT INTO cat VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Zenitsu " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
        console.log(row.id + ": " + row.info);
    });
});

db.close();
