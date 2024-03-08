import mapboxgl from 'mapbox-gl';
import yellow from '../../Assets/airplaneyellow.png';
import {feature, length} from '@turf/turf';
let MAP = null;
export const initializeMap = (containerRef,options) => {
    if(!MAP){
        MAP = new mapboxgl.Map({
            accessToken : options.accessToken,
            container: containerRef.current,
            fadeDuration : 0,
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

export const addflightsLayerToMap=(map,id,callback)=>{
    try{
        let layer = {
            id: id,
            type: 'symbol',
            source: id,
            //fadeDuration: 0,
            layout: {
                'icon-image': ['get', 'icon-default'],
                'icon-size': 0.4,
                'text-size' : 10,
                'text-field': ['get', 'name'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.8],
                'text-anchor': 'top',
                'icon-rotate': ['get', 'bearing'],
                'icon-rotation-alignment': 'map',
                'icon-allow-overlap' : true
            },
            paint: {
                'icon-color': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#4287f5',
                    '#d9be25' 
                ]
            }
            
        };
        addLayerToMap(map,layer,{type: 'FeatureCollection',features: []},(layer,error)=>{
            if(error){
                callback(layer,null);
            }else{
                var hoveredFeatureId = null;
                map.on('mouseenter', id, function (e) {
                    if (e.features.length > 0) {
                        map.getCanvas().style.cursor = 'pointer';
                        hoveredFeatureId = e.features[0].id;
                        map.setFeatureState(
                            { source: id, id: hoveredFeatureId },
                            { hover: true }
                        );
                    }
                });
                map.on('mouseleave', id, function(e) {
                    map.getCanvas().style.cursor = '';
                    map.setFeatureState(
                        { source: id, id: hoveredFeatureId },
                        { hover: false }
                    );
                });
                callback(null,error);
            }
        })
    }catch(error){
        callback(null,error);
    }
}

export const addRoutesLayerToMap=(map,id,callback)=>{
    try{
        let layer = {
            id: id,
            type: 'line',
            source: id,
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#999999',
                'line-width': 2
            }
        };
        addLayerToMap(map,layer,{type: 'FeatureCollection',features: []},(layer,error)=>{
            if(error){
                callback(layer,null);
            }else{
                callback(null,error);
            }
        })
    }catch(error){
        callback(null,error);
    }
}

export const addTrailsLayerToMap=(map,id,callback)=>{
    const layer = {
        id: id,
        type: 'line',
        source: id,
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#ff1000',
            'line-width': 2
        }
    }
    addLayerToMap(map,layer,{type: 'FeatureCollection',features: []},(layer,error)=>{
        if(error){
            callback(layer,null);
        }else{
            map.setFilter(id, ['==', ['get', 'flight_id'], null]);
            callback(null,error);
        }
    });
}

const addLayerToMap=(map,layer,data,callback)=>{
    try{
        map.addSource(layer.source, {
            type: 'geojson',
            data: data
        });
        map.addLayer(layer);
        callback(layer,null);
    }catch(error){
        callback(null,error);
    }
}

export const setLayerData=(map,source_id,data)=>{
    try{
        if(map && map.getLayer(source_id)){
            map.getSource(source_id).setData(data);
        }else{
            console.log('source is not loaded');
        }
    }catch(error){
        console.log('source is not loaded');
    }
}


const updateTrail=(map,flight_id,point)=>{
    try{
        let data = {...map.getSource('trails')._data}
        let ind = data.features.findIndex((d)=> d.properties.flight_id == flight_id);
        if(ind>=0){
            let coords = data.features[ind].geometry.coordinates[data.features[ind].geometry.coordinates.length-1];
            if(coords[0] != point[0] || coords[0] != point[0]){
                data.features[ind].geometry.coordinates.push(point);
                map.getSource('trails').setData(data);
            }
        } else{
            data.features.push({
                "type": "Feature",
                "properties": {flight_id : flight_id},
                "geometry": {
                    "coordinates": [point],
                    "type": "LineString"
                }
            });
            map.getSource('trails').setData(data);
    
        }
    }catch(error){
        console.log(error);
    }
}

export const animateFeatureTransition=(map,source,featureCollection,callback)=>{
    try{
        if(map.getLayer(source)){
            let duration = 300;
            let fps = 15;
            let oldFeatures = map.queryRenderedFeatures({layers: [source]});
            const animate=(step)=>{
                if(document.hidden){
                    let data = {...map.getSource('trails')._data}
                    map.getSource('trails').setData({
                        ...data,
                        features: featureCollection.features.map((feature)=>{
                            let trail = data.features.find((d)=> d.properties.flight_id == feature.id);
                            if(trail){
                                trail.geometry.coordinates.push(feature.geometry.coordinates);
                                return trail;
                            }else{
                                return{
                                    "type": "Feature",
                                    "properties": {flight_id : feature.id},
                                    "geometry": {
                                        "coordinates": [feature.geometry.coordinates],
                                        "type": "LineString"
                                    }
                                }
                            }
                        })
                    });
                    map.getSource(source).setData(featureCollection);
                    callback(true,null);
                    return;
                }
                const frac = step / fps;
                try{
                    map.getSource(source).setData({
                        ...featureCollection,
                        features: featureCollection.features.map((feature)=>{
                           
                            let oldFeature = oldFeatures.find((d)=> d.id == feature.id);
                            let lng = (oldFeature? oldFeature.geometry.coordinates[0] + ((feature.geometry.coordinates[0] - oldFeature.geometry.coordinates[0]) * frac) :  feature.geometry.coordinates[0]);
                            let lat = (oldFeature? oldFeature.geometry.coordinates[1] + ((feature.geometry.coordinates[1] - oldFeature.geometry.coordinates[1]) * frac) :  feature.geometry.coordinates[1]);
                            //updateTrail(map,feature.id,[lng,lat]);
                            return {
                                ...feature,
                                geometry:{
                                    ...feature.geometry,
                                    coordinates:[lng,lat]
                                },
                            }
                        })
                    });
                    let data = {...map.getSource('trails')._data}
                    map.getSource('trails').setData({
                        ...data,
                        features: featureCollection.features.map((feature)=>{
                            let trail = data.features.find((d)=> d.properties.flight_id == feature.id);
                            let oldFeature = oldFeatures.find((d)=> d.id == feature.id);
                            let lng = (oldFeature? oldFeature.geometry.coordinates[0] + ((feature.geometry.coordinates[0] - oldFeature.geometry.coordinates[0]) * frac) :  feature.geometry.coordinates[0]);
                            let lat = (oldFeature? oldFeature.geometry.coordinates[1] + ((feature.geometry.coordinates[1] - oldFeature.geometry.coordinates[1]) * frac) :  feature.geometry.coordinates[1]);
                            if(trail){
                                trail.geometry?.coordinates?.push([lng,lat]);
                                return trail;
                            }else{
                                return{
                                    "type": "Feature",
                                    "properties": {flight_id : feature.id},
                                    "geometry": {
                                        "coordinates": [[lng,lat]],
                                        "type": "LineString"
                                    }
                                }
                            }
                        })
                    });
                }catch(error){
                    console.log(error);
                    callback(null,error);
                }finally{
                    if(step<fps){
                        setTimeout((step)=> animate(step),duration/fps,step+1);
                    }else{
                        callback(true,null);
                    }
                }

            }
            animate(0);
        }
    }catch(error){
        console.log(error);
    }
}
