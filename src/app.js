const express = require('express');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + "/views");

app.get('/', (request, response) => {
    response.render("index.hbs", {
    });
});

app.listen(process.env.PORT || 3000);