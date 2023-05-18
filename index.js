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
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/search'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
