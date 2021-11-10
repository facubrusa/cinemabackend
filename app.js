const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();

// Habilite cors
/* const configCors = {
    origin: process.env.FRONTEND_URL
} */
app.use( cors() );

app.use(bodyParser.json());

// Routes of the app
app.use('/api/movies', require('./routes/movies'));
app.use('/api/sessions', require('./routes/sessions'));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));