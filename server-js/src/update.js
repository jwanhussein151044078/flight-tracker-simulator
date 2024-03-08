const {sequelize} = require('./models');
const models = require('./models/index.js');
const turf = require('@turf/turf');

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
        
        setTimeout((ind)=>updateFlights(ind),1000,ind+1)
    }catch(err){
        console.log("an error",err);
        setTimeout((ind)=>updateFlights(ind),1000,ind);
    }
}

sequelize.authenticate()
.then(async()=>{
    console.log('DataBase Connection Established');
    await models['trails'].truncate(); 
    setTimeout((ind)=>{
        updateFlights(ind);
    },1000,0);
}).catch((err)=>{
    console.log('DataBase Connection Error ',err);
})