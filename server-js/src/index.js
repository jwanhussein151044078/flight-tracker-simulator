const express = require('express');
const {sequelize} = require('./models');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const credentials = require('./middleware/credentials');
const errorHandler = require('./middleware/errorHandler.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT ;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({limit: '200mb'}));

app.use('/map/specs', require('./routes/mapSpecsRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    sequelize.authenticate()
    .then(()=>{
        app.set('db',require('./models/index.js'));
        console.log(`Example app listening on port ${port}`)
        console.log('DataBase Connection Established')
    }).catch((err)=>{
        console.log('DataBase Connection Error ',err);
    })
})