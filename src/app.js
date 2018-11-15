const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + "/views");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.render("index.hbs", {
    });
});

app.listen(process.env.PORT || 3000);