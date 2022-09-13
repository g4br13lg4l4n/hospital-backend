const express = require('express');
require('dotenv').config();
const cors = require('cors')

const { bdConnection } = require('./database/config');

// Servidor express
const app = express();

// Config CORS
app.use(cors());

//Base de datos
bdConnection();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.json({
        ok: 200
    })
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
