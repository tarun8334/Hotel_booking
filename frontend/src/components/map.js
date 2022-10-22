import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios"

import MarkerClusterGroup from 'react-leaflet-cluster'
import { MapContainer, TileLayer, Marker, Tooltip , Popup } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = (props) => {
    const [hotel, sethotel] = useState([]);
    const navigate = useNavigate();

    const tileLayer = {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
    useEffect(() => {
        axios
            .get("http://localhost:4000/hotel/")
            .then((response) => {
                sethotel(response.data);
            })
            .catch((error) => {
            });
    }, []);

    const a = "51.505"
    const b = "-0.09"
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate("/")}
                        >
                            Samarth Tourist Management Service
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button color="inherit" onClick={() => { navigate("/hotel") }}>
                            Hotel
                        </Button>
                        <Button variant="contained" color="info" onClick={() => { }}>
                            Map
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/booking")}>
                            Booking
                        </Button>
                        <Button color="warning" onClick={() => navigate("/")}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <br /><br /><br /><br />
            <Grid container align={'center'}>
                <Grid item xs={12}>
                    <MapContainer style={{ height: '70vh', width: '70vw' }}
                        center={[14.8, 77.4]} zoom={5} scrollWheelZoom={true}>
                        <TileLayer {...tileLayer} />
                        <MarkerClusterGroup
                            chunkedLoading
                        >
                            {hotel.map((users1) =>
                                <Marker position={[users1.location.lat, users1.location.long, "abc"]} >
                                    <Tooltip>
                                    Hotel: {users1.name} <br /> Room Available: {users1.room_count}
                                    </Tooltip>
                                    {/* <Popup>
                                        Hotel: {users1.name} <br /> Room Available: {users1.room_count}
                                    </Popup> */}
                                </Marker>
                            )}
                        </MarkerClusterGroup>
                    </MapContainer>
                </Grid>
            </Grid>
            <br />
        </>
    );
};

export default Map;
