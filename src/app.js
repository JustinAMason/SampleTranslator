const express = require('express');
const path = require('path');
const ISO6391 = require('iso-639-1');
const {Translate} = require('@google-cloud/translate');

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // To obtain credentials, go to https://cloud.google.com/translate/docs/quickstart
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "ENTER THE PATH TO YOUR GOOGLE APPLICATION CREDENTIALS HERE";
}

const projectId = 'translator-222623'; // Change this to the projectId listed in your credentials json file
const translate = new Translate({projectId: projectId});

const app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + "/views");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

let inputText;
let inputLanguage;
let outputText;

app.get('/', (request, response) => {
    response.render("index.hbs", {
        "text": inputText
    });
});

app.get('/translation', (request, response) => {
    response.render("translation.hbs", {
        "inputText": inputText,
        "inputLanguage": inputLanguage,
        "outputText": outputText
    });
});

app.post('/', (request, response) => {
    inputText = request.body.input_box;

    translate.detect(inputText).then(languages => {
        inputLanguage = ISO6391.getName(languages[0].language);
        translate.translate(inputText, "en").then(translations => {
            outputText = translations[0];
            response.redirect("/translation");
        }).catch(err => {
            console.log(err);
            inputText = "An error occurred during translation.";
            inputLanguage = "ERR";
            outputText = "An error occured during translation.";
            response.redirect("/translation");
        });
    }).catch(err => {
        console.log(err);
        inputText = "An error occurred during translation.";
        inputLanguage = "ERR";
        outputText = "An error occured during translation.";
        response.redirect("/translation");
    });
});

app.post('/translation', (request, response) => {
    response.redirect("/");
});

app.listen(process.env.PORT || 3000);