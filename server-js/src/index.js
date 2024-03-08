const express = require('express');
const http = require('http');
const {sequelize} = require('./models');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const credentials = require('./middleware/credentials');
const errorHandler = require('./middleware/errorHandler.js');
const { Server } = require('socket.io');
const models = require('./models/index.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const server = http.createServer(app);
const io = new Server(server,{
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({limit: '200mb'}));

app.use('/map/specs', require('./routes/mapSpecsRoutes'));
app.use('/routes', require('./routes/routesRoutes'));
app.use('/flights', require('./routes/flightsRoutes'));
app.use(errorHandler);


sequelize.authenticate()
.then(()=>{
    server.listen(port, () => {
        app.set('db',models);
        console.log(`Example app listening on port ${port}`)
        console.log('DataBase Connection Established')
        setInterval(async() => {
            let flights = await models['flights'].findAll({include:['trail']});
            io.emit('flights', flights);
        }, 1000);
    })
}).catch((err)=>{
    console.log('DataBase Connection Error ',err);
})