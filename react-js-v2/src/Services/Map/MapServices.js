import mapboxgl from 'mapbox-gl';
import yellow from '../../Assets/airplaneyellow.png';
import * as turf from '@turf/turf';
let MAP = null;
export const initializeMap = (containerRef,options) => {
    if(!MAP){
        console.log(options)
        MAP = new mapboxgl.Map({
            accessToken : options.accessToken,
            container: containerRef.current,
            ...options,
        });  
        MAP.loadImage(yellow,(error,image)=>{
            if(error){
                console.log(error)
            }else{
                MAP.addImage('yellow-airplane', image,{ sdf: true });
            }
        })
        
          
    }
    return MAP ; 
};

export const removeMap =()=>{
    try{
        if(MAP){
            MAP.remove()
            MAP = null ;    
        }
    }catch(error){
        console.log(error)
    }
}

export const addRoutesToMap=(map,featureCollection)=>{
    try{
        if(map){
            map.addSource('routes', {
                type: 'geojson',
                data: featureCollection
            });
            map.addLayer({
                id: 'routes',
                type: 'line',
                source: 'routes',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#999999',
                    'line-width': 2
                }
            });
        }
    }catch(error){
        console.log(error)
    }
}

export const addTrailsToMap=(map,featureCollection)=>{
    try{
        if(map){
            map.addSource('trails', {
                type: 'geojson',
                data: featureCollection
            });
            map.addLayer({
                id: 'trails',
                type: 'line',
                source: 'trails',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#ff1000',
                    'line-width': 2
                }
            });
        }
    }catch(error){
        console.log(error)
    }
}

const updateTrail=(map,flight_id,point)=>{
    try{
        let data = {...map.getSource('trails')._data}
        let ind = data.features.findIndex((d)=> d.properties.flight_id == flight_id);
        if(ind>=0){
            data.features[ind].geometry.coordinates.push(point);
        } else{
            data.features.push({
                "type": "Feature",
                "properties": {flight_id : flight_id},
                "geometry": {
                    "coordinates": [point],
                    "type": "LineString"
                }
            })
        }
        map.getSource('trails').setData(data);
    }catch(error){
        console.log(error);
    }
}

export const addFlightsToMap=(map,featureCollection,source_id = 'flights')=>{
    try{
        if(map){
            map.addSource(source_id, {
                type: 'geojson',
                data: featureCollection
            });
            map.addLayer({
                id: source_id,
                type: 'symbol',  
                source: source_id,
                layout: {
                    'icon-image': ['get', 'icon-default'],
                    'icon-size': 0.5,
                    'text-field': ['get', 'name'],
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.8],
                    'text-anchor': 'top',
                    'icon-rotate': ['get', 'bearing'],
                    'icon-rotation-alignment': 'map',
                },
                paint: {
                    'icon-color': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        '#4287f5',
                        '#d9be25' 
                    ]
                }
            });
            var hoveredFeatureId = null;
            map.on('mouseenter', source_id, function (e) {
                if (e.features.length > 0) {
                    map.getCanvas().style.cursor = 'pointer';
                    hoveredFeatureId = e.features[0].id;
                    map.setFeatureState(
                        { source: source_id, id: hoveredFeatureId },
                        { hover: true }
                    );
                }
            });
            map.on('mouseleave', source_id, function(e) {
                map.getCanvas().style.cursor = '';
                map.setFeatureState(
                    { source: source_id, id: hoveredFeatureId },
                    { hover: false }
                );
            });
        }
    }catch(error){
        console.log(error);
    }
}



export const updateFlightsLocation=(map,featureCollection,source_id='flights')=>{
    try{
        if(map && map.isSourceLoaded(source_id)){
            let startTime = null;
            const duration = 500;
            let oldFeatures = [...map.queryRenderedFeatures({layers: [source_id]})];
            const bearings = Array.from({ length: featureCollection.features.length }, () => 0);
            function animate(time){
                if (!startTime) startTime = time;
                const progress = time - startTime;
                const frac = progress / duration;
                
                if (frac < 1){
                    map.getSource(source_id).setData({
                        ...featureCollection,
                        features: featureCollection.features.map((feature,ind)=>{
                            let oldFeature = oldFeatures.find((d)=> d.id == feature.id);
                            let lng = (oldFeature? oldFeature.geometry.coordinates[0] + ((feature.geometry.coordinates[0] - oldFeature.geometry.coordinates[0]) * frac) :  feature.geometry.coordinates[0]);
                            let lat = (oldFeature? oldFeature.geometry.coordinates[1] + ((feature.geometry.coordinates[1] - oldFeature.geometry.coordinates[1]) * frac) :  feature.geometry.coordinates[1]);
                            bearings[ind]= turf.bearing([lat,lng],[feature.geometry.coordinates[1],feature.geometry.coordinates[0]])*-1
                            updateTrail(map,feature.id,[lng,lat]);
                            return {
                                ...feature,
                                geometry:{
                                    ...feature.geometry,
                                    coordinates:[lng,lat]
                                },
                                properties:{
                                    ...feature.properties,
                                    bearing : bearings[ind] 
                                }
                            }
                        })
                    });
                    
                    requestAnimationFrame(animate);
                }else{
                    map.getSource(source_id).setData({
                        ...featureCollection,
                        features: featureCollection.features.map((feature,ind)=>{
                            return {
                                ...feature,
                                properties:{
                                    ...feature.properties,
                                    bearing : bearings[ind] 
                                }
                            }
                        })
                    });
                }
            }
            requestAnimationFrame(animate);
        }
    }catch(error){
        console.log(error)
    }
    
};

