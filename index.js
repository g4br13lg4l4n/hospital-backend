const express = require('express');
require('dotenv').config();
const cors = require('cors')

const { bdConnection } = require('./database/config');

// Servidor express
const app = express();

// Config CORS
app.use(cors());

// Read of body
app.use(express.json());

//Base de datos
bdConnection();
const port = process.env.PORT || 3001;

// Routers
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
