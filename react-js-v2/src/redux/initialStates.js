export const mapState ={
    loading : true ,
    mapSpecs : {},
    // style: 'mapbox://styles/mapbox/standard',
    // center: [28.9784, 41.0082 ],
    // zoom: 8.5
  
}

export const flights = {
  type: 'FeatureCollection',
  features: [
    {
      id : 1,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 1',
        'icon-default' :'yellow-airplane',
        path_id : 1,
        aircraft_model : 'BOEING 737 MAX 7',
        capacity : '555',
        pilot: 'Alexander Martinez',
        destination: 'Atatürk Airport, Istanbul',
        speed : '550',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [28.45577862214253, 40.765037549402024]}
    },
    {
      id : 2,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 2',
        'icon-default' :'yellow-airplane',
        path_id : 2,
        aircraft_model : 'AIRBUS A318',
        capacity : '552 ',
        pilot: 'Mia Garcia',
        destination: 'Atatürk Airport, Istanbul',
        speed : '550',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [28.45047811179981, 40.69339200125887 ]
      }
    },
    {
      id : 3,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 3',
        'icon-default' :'yellow-airplane',
        path_id : 3,
        aircraft_model : 'AIRBUS A319',
        capacity : '123',
        pilot: 'Benjamin Anderson',
        destination: 'Sabiha Gökçen Airport, Istanbul',
        speed : '550',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [28.994175293845046, 40.68167322447897 ]
      }
    },
    {
      id : 4,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 4',
        'icon-default' :'yellow-airplane',
        path_id : 4,
        aircraft_model : 'AIRBUS A330-200F',
        capacity : '321',
        pilot: 'Ava Thompson',
        destination: 'Barcelona–El Prat Airport, Barcelona',
        speed : '530',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [29.29358462557917, 40.893832010162726 ]
      }
    },
    {
      id : 5,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 5',
        'icon-default' :'yellow-airplane',
        path_id : 5,
        aircraft_model : 'AIRBUS A350-1000',
        capacity : '333',
        pilot: 'Ethan Wilson',
        destination: 'Charles de Gaulle Airport, Paris',
        speed : '540',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [28.81125692489522, 40.96658218536993 ]
      }
    },
    {
      id : 6,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 6',
        'icon-default' :'yellow-airplane',
        path_id : 6,
        aircraft_model : 'BOEING 747-8I',
        capacity : '355',
        pilot: 'Sophia Rodriguez',
        destination: 'Amsterdam Airport Schiphol, Amsterdam',
        speed : '770',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [28.756538300258512, 41.26371668232167 ]
      }
    },
    {
      id : 7,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 7',
        'icon-default' :'yellow-airplane',
        path_id : 7,
        aircraft_model : 'AIRBUS A319',
        capacity : '522',
        pilot: 'William Davis',
        destination: 'Amsterdam Airport Schiphol, Amsterdam',
        speed : '880',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [28.72738656709771, 41.26262985791013 ]
      }
    },
    {
      id : 8,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 8',
        'icon-default' :'yellow-airplane',
        path_id : 8,
        aircraft_model : 'BOEING 777-300ER',
        capacity : '453',
        pilot: 'Olivia Brown',
        destination: 'Istanbul Airport, Istanbul',
        speed : '720',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [ 28.60140462392161, 41.499454341429725 ]
      }
    },
    {
      id :9,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 9',
        'icon-default' :'yellow-airplane',
        path_id : 9,
        aircraft_model : 'AIRBUS A319',
        capacity : '258',
        pilot: 'Daniel Martinez',
        destination: 'Istanbul Airport, Istanbul',
        speed : '650',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [ 28.436545719233038, 41.17165790247546]
      }
    },
    {
      id : 10,
      type: 'Feature',
      properties: {
        name: 'FLIGHT 10',
        'icon-default' :'yellow-airplane',
        path_id : 10,
        aircraft_model : 'AIRBUS A319',
        capacity : '444',
        pilot: 'Emily Johnson',
        destination: 'Sabiha Gökçen Airport, Istanbul',
        speed : '560',
        path_ind : 0
      },
      geometry: {
        type: 'Point',
        coordinates: [ 28.9317569539092, 40.98288316213103 ]
      }
    },
  ]
}
export const routes ={
  "type": "FeatureCollection",
  "features": []
}

