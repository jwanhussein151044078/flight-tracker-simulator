import React, { useEffect, useMemo, useState } from 'react';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Container,
  Button,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import SpeedIcon from '@mui/icons-material/Speed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { connect } from 'react-redux';
import ExploreIcon from '@mui/icons-material/Explore';

function PopUp(props){
    //const [flight,setFlight] = useState({});
    const onClickClose=()=>{
        if(props.onClose){
            props.onClose();
        }
    }
    const flight = useMemo(()=>{
        return props.flights.features.find((flight)=> flight.properties.id == props.flightId);
    },[props.flightId,props.flights])

    // useEffect(()=>{
    //     setFlight(props.flights.features.find((flight)=> flight.properties.id == props.flightId));
    //     return()=>{};
    // },[]);
    return (<>
        {flight &&
        <Container className='popupContainer'>
            <div className="padding-20">
                <Grid container spacing={1}>
                    <Grid item xs={12} className='header'>
                        <Paper className="paper">
                            <Typography variant="h5" >
                                {flight?.properties?.name}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className='listContainer'>
                        <Card   Card className="card hegiht-100">
                            <CardContent className="hegiht-100">
                                <Typography variant="h5" component="h2">
                                    {flight?.properties?.aircraft_model}
                                </Typography>
                                <Typography className="" color="textSecondary">
                                    {flight?.properties?.aircraft_type}
                                </Typography>
                                <Divider />
                                <List className='overflow-auto'>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FlightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Capacity: ${flight?.properties?.capacity || 0} passengers`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Pilot: ${flight?.properties?.pilot || ''}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FlightLandIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={flight?.properties?.destination} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <SpeedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Speed: ${flight?.properties?.speed || 0} KM`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ExploreIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Bearings: ${flight?.properties?.bearing*-1 || 0} `} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOnIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`${flight?.geometry?.coordinates[0] || 0} ${flight?.geometry?.coordinates[1] || 0}`} />
                                    </ListItem> 
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} className='buttonContainer'>
                        <Button fullWidth color='error' variant="contained" startIcon={<CloseIcon />} onClick={onClickClose}>
                            Close
                        </Button>    
                    </Grid>
                </Grid>
            </div>
        </Container>
        }
      </>);

    
}

const mapStateToProps = (state) => {
    return {
        flights : state.flights,
    };
};


export default connect(mapStateToProps)(PopUp);