const express = require('express');
const app = express();
const port = 3000;
const sqlite = require("better-sqlite3");
const DB = new sqlite("./banco.db");
app.use(express.json());
app.get('/cat', (req, res) => {
    const data = [];
    const rows = DB.prepare("SELECT * FROM cat").all();

    rows.forEach((item) => {
        data.push({
            name: item.name
        });
    });

    res.json(data);
})

app.post('/cat', function (request, response) {
    const stmt = DB.prepare('INSERT INTO cat (name) VALUES (?)');
    stmt.run(request.body.name);
    response.send('terminou');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})







