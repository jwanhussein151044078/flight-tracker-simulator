const express = require('express');
const http = require('http');
const {sequelize} = require('./models');
const models = require('./models/index.js');
const turf = require('@turf/turf');
const { Server } = require('socket.io');

const app = express();
const port = process.env.SOKECT_PORT || 8001;
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

const random =()=> {
    return Math.random() * 70 - 35;
}

const getRandomNextPoint=(flight,transaction)=>{
    return new Promise((resolve,reject)=>{
        sequelize.query(`
            select ST_Project(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(flight.coordinates)}')::geography , 4326), 1000.0, radians(${flight.bearings+90+random()})) as point
        `,{transaction:transaction}).then((res)=>{
            resolve(res[0][0].point);
        }).catch((error)=>{
            reject(error);
        })
    });
};

const updateFlights=async(ind)=>{
    try{
        const result = await sequelize.transaction(async (t) => {
            let flights = await models['flights'].findAll({include :{model:models['routes'],as:'route'}},{transaction:t});
            for(let i = 0 ; i< flights.length ; i++){
                if(flights[i].route){
                    if(flights[i].route.route.coordinates.length > ind){
                        flights[i].bearings = turf.bearing(flights[i].coordinates.coordinates,flights[i].route.route.coordinates[ind])-90;
                        flights[i].coordinates = {
                            ...flights[i].coordinates,
                            coordinates : flights[i].route.route.coordinates[ind]
                        }
                        let trail = await flights[i].getTrail({transaction:t});
                        if(trail){
                            if(trail.trail){
                                trail.trail = {
                                    ...trail.trail,
                                    coordinates : [...trail.trail.coordinates,flights[i].route.route.coordinates[ind]]
                                }
                            }else{
                                trail.trail = {
                                    type: "LINESTRING",
                                    coordinates: [flights[i].route.route.coordinates[ind],flights[i].route.route.coordinates[ind]]
                                }
                            }
                            await trail.save({transaction:t});   
                        }else{
                            await models['trails'].create({
                                flight_id : flights[i].id,
                                trail:{
                                    type: "LINESTRING",
                                    coordinates: [flights[i].route.route.coordinates[ind],flights[i].route.route.coordinates[ind]]
                                }
                            },{transaction:t})
                        }
                        await flights[i].save({transaction:t});
                    }
                }else{
                    let nextPoint = await getRandomNextPoint(flights[i],t);
                    flights[i].bearings = turf.bearing(flights[i].coordinates.coordinates,nextPoint.coordinates)-90;
                    flights[i].coordinates = nextPoint;
                    let trail = await flights[i].getTrail({transaction:t});
                    if(trail){
                        if(trail.trail){
                            trail.trail = {
                                ...trail.trail,
                                coordinates : [...trail.trail.coordinates,nextPoint.coordinates]
                            }
                        }else{
                            trail.trail = {
                                type: "LINESTRING",
                                coordinates: [nextPoint.coordinates,nextPoint.coordinates]
                            }
                        }
                        await trail.save({transaction:t});   
                    }else{
                        await models['trails'].create({
                            flight_id : flights[i].id,
                            trail:{
                                type: "LINESTRING",
                                coordinates: [nextPoint.coordinates,nextPoint.coordinates]
                            }
                        },{transaction:t})
                    }
                    await flights[i].save({transaction:t});
                }
            }
        })
        return true;
    }catch(err){
        console.log("an error",err);
        return false ;
    }
}

sequelize.authenticate()
.then(async()=>{
    console.log('DataBase Connection Established');
    await models['trails'].truncate();
    server.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
        let counter = 0 ;
        setInterval(async()=>{
            let status = await updateFlights(counter++);
            if(status){
                let flights = await models['flights'].findAll({include:['trail']});
                io.emit('flights', flights);
            }
        },1000,0);
    }) 
}).catch((err)=>{
    console.log('DataBase Connection Error ',err);
})