const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/translator');

const Schema = mongoose.Schema;

const TranslationSchema = new mongoose.Schema({
    input: String,
    translation: String
});

Schema.ObjectId

mongoose.model("Translation", TranslationSchema);
mongoose.connect("mongodb://localhost/translator");