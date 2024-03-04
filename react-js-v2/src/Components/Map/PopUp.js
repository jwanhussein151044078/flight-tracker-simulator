import React, { useEffect } from 'react';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Container,
  IconButton,
  Button,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import SpeedIcon from '@mui/icons-material/Speed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { connect } from 'react-redux';

function PopUp(props){
    const onClickClose=()=>{
        if(props.onClose){
            props.onClose();
        }
    }
    return (<>
        {(props.flightId || props.flightId == 0) &&
        <Container className='popupContainer'>
            <div className="padding-20">
                <Grid container spacing={1}>
                    <Grid item xs={12} className='header'>
                        <Paper className="paper">
                            <Typography variant="h5" >
                                {props.flights.features[props.flightId].properties.name}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className='listContainer'>
                        <Card   Card className="card hegiht-100">
                            <CardContent className="hegiht-100">
                                <Typography variant="h5" component="h2">
                                    {props.flights.features[props.flightId].properties.aircraft_model}
                                </Typography>
                                <Typography className="" color="textSecondary">
                                    Passenger Airliner
                                </Typography>
                                <Divider />
                                <List className='overflow-auto'>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FlightIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Capacity: ${props.flights.features[props.flightId].properties.capacity || 0} passengers`} />
                                    </ListItem>
                                        <ListItem>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Pilot: ${props.flights.features[props.flightId].properties.pilot || ''}`} />
                                    </ListItem>
                                        <ListItem>
                                        <ListItemIcon>
                                            <FlightLandIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={props.flights.features[props.flightId].properties.destination} />
                                    </ListItem>
                                        <ListItem>
                                        <ListItemIcon>
                                            <SpeedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`Speed: ${props.flights.features[props.flightId].properties.speed || 0} KM`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOnIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`${props.flights.features[props.flightId].geometry.coordinates[0]|| 0} ${props.flights.features[props.flightId].geometry.coordinates[1]|| 0}`} />
                                    </ListItem>
                                    
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sx ={{height:'5%'}}>
                        <Button color='error' variant="contained" startIcon={<CloseIcon />} onClick={onClickClose}>
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