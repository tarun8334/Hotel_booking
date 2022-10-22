import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const Booking = (props) => {
    const [booking, setbooking] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/booking/")
            .then((response) => {
                setbooking(response.data);
            })
            .catch((error) => {
            });
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleRoomCancel = (id, hotelID, no_of_room) => {
        const newUser = {
            id: id,
        };
        axios
            .post("http://localhost:4000/booking/cancel", newUser)
            .then((response) => {

                const newUser2 = {
                    id: hotelID,
                };
                axios
                    .post("http://localhost:4000/hotel/hotelname", newUser2)
                    .then((response) => {
                        const newUser1 = {
                            id: hotelID,
                            rooms: parseInt(response.data.room_count) + parseInt(no_of_room),
                        };
                        axios
                            .post("http://localhost:4000/hotel/updateroom", newUser1)
                            .then((response) => {
                                window.location.reload()
                            })
                            .catch((res) => {
                            }
                            );
                    })
                    .catch((res) => {
                    }
                    );
            })
            .catch((res) => {

            }
            );
    }

    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate("/hotel")}
                        >
                            Samarth Tourist Management Service
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button color="inherit" onClick={() => { navigate("/hotel") }}>
                            Hotel
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/map")}>
                            Map
                        </Button>
                        <Button variant="contained" color="info" onClick={() => { }}>
                            Booking
                        </Button>
                        <Button color="warning" onClick={() => navigate("/")}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <br />
            <Grid container align={'center'}>
            <Grid item xs={12}>
          <Typography variant="h3">
            Bookings
          </Typography>
        </Grid>
                <Grid item xs={12}>
                    {booking.map((user) => (
                        <>
                            {user.tourist_id == localStorage.getItem("tourist_id") &&
                                <>
                                    <Card sx={{ maxWidth: 1520 }}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <Item>
                                                        <b>Hotel</b>
                                                        <br /><br />
                                                        {user.hotel_name}
                                                    </Item>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Item>
                                                        <b>Check In</b>
                                                        <br /><br />
                                                        {user.check_in}
                                                    </Item>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Item>
                                                        <b>Check out</b>
                                                        <br /><br />
                                                        {user.check_out}
                                                    </Item>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Item>
                                                        <b>No. of rooms</b>
                                                        <br /><br />
                                                        {user.no_of_room}
                                                    </Item>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <br />
                                                    <Button variant="contained" onClick={() => {
                                                        handleRoomCancel(user._id, user.hotel_id, user.no_of_room);
                                                    }}>
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <br />
                                </>
                            }
                        </>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default Booking;
