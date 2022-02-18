const express = require('express');
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3333;

require('./database');
const app = express();

app.use(cors());
app.use(express.json())
app.use(routes);

app.listen(PORT, () => console.log(`Lintening on ${PORT}`));
module.exports = app;