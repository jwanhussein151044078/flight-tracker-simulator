export const isEqualFeatureCollectionsWithFlights=(featureCollection,flights)=>{
    try{
        if(!featureCollection || !flights){
            return false;
        }else if(featureCollection.features.length != flights.length){
            return false;
        }
        for(let i = 0 ; i < featureCollection.features.length ; i++){
            let flight = flights.find((d)=> d.id == featureCollection.features[i].id);
            if(!flight){
                return false
            }else{
                if( flight.coordinates?.coordinates[0] != featureCollection.features[i].geometry.coordinates[0] ||
                    flight.coordinates?.coordinates[1] != featureCollection.features[i].geometry.coordinates[1] ){
                        return false ;
                }else if(flight.aircraft_model != featureCollection.features[i].properties.aircraft_model){
                    return false;
                }else if(flight.aircraft_type != featureCollection.features[i].properties.aircraft_type){
                    return false;
                }else if(flight.bearings != featureCollection.features[i].properties.bearing){
                    return false;
                }else if(flight.capacity != featureCollection.features[i].properties.capacity){
                    return false;
                }else if(flight.name != featureCollection.features[i].properties.name){
                    return false;
                }else if(flight.destination != featureCollection.features[i].properties.destination){
                    return false;
                }else if(flight.pilot != featureCollection.features[i].properties.pilot){
                    return false;
                }else if(flight.speed != featureCollection.features[i].properties.speed){
                    return false;
                }
            }
        }
        return true;
    }catch(error){
        return false;        
    }
}

export const getEmptyFeatureCollection=()=>{
    return {type: 'FeatureCollection',features: []};
}

export const getTrailsFeatureCollectionFromFlights=(flights)=>{
    try{
        return {
            type: 'FeatureCollection',
            features: flights.features.map((flight)=>{
              return {
                type:'lineString',
                properties:{flight_id:flight.id},
                geometry:flight.trail?.trail
              }
            })
        }
    }catch(error){
        console.log(error);
        return getEmptyFeatureCollection();
    }
}

export const getFeaturesFromFlights=(flights)=>{
    try{
        return flights.map((flight)=> {return{
            id : flight.id ,
            type: "Feature",
            properties: {
              name : flight.name, 
              id : flight.id ,
              'icon-default' :'yellow-airplane',
              path_id : flight.route_id,
              aircraft_model : flight.aircraft_model,
              aircraft_type : flight.aircraft_type,
              capacity : flight.capacity,
              pilot: flight.pilot,
              destination: flight.destination,
              speed : flight.speed,
              bearing : flight.bearings
            },
            geometry: flight.coordinates,
            trail: flight.trail
          }})
    }catch(error){
        console.log(error);
        return [];
    }
}