const {sequelize} = require('./models');
const models = require('./models/index.js');
const turf = require('@turf/turf');

const updateFlights=async(ind)=>{
    try{
        let flights = await models['flights'].findAll({include :{model:models['routes'],as:'route'}});
        for(let i = 0 ; i< flights.length ; i++){
            if(flights[i].route.route.coordinates.length > ind){
                flights[i].bearings = turf.bearing(flights[i].coordinates.coordinates,flights[i].route.route.coordinates[ind])-90;
                flights[i].coordinates = {
                    ...flights[i].coordinates,
                    coordinates : flights[i].route.route.coordinates[ind]
                }
                await flights[i].save();
            }
        }
        setTimeout((ind)=>updateFlights(ind),1000,ind+1)
    }catch(err){
        console.log(err);
        setTimeout((ind)=>updateFlights(ind),1000,ind);
    }
}

sequelize.authenticate()
.then(()=>{
    console.log('DataBase Connection Established');
    setTimeout((ind)=>{
        updateFlights(ind);
    },1000,0);
}).catch((err)=>{
    console.log('DataBase Connection Error ',err);
})