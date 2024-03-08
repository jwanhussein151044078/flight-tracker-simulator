const {sequelize} = require('./models');
const models = require('./models/index.js');
const turf = require('@turf/turf');

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

                }
            }
        })
        
        setTimeout((ind)=>updateFlights(ind),1000,ind+1)
    }catch(err){
        console.log(err);
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