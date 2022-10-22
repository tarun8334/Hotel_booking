import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const Hotel = (props) => {
    const [hotel, sethotel] = useState([]);
    const [booking, setbooking] = useState([]);
    const [open, setOpen] = useState(false);
    const [hotelId, sethotelId] = useState("");
    const [hotelName, sethotelName] = useState("");
    const [hotelRoom, sethotelRoom] = useState("");
    const [hotelDetail, sethotelDetail] = useState("");
    const [numberofRooms, setnumberofRooms] = useState('');
    const [roomstotal, setroomstotal] = useState('');
    const [from, setfrom] = React.useState(moment(new Date()).format("YYYY-MM-DD"));
    const [to, setto] = React.useState(moment(new Date()).format("YYYY-MM-DD"));

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    useEffect(() => {
        axios
            .get("http://localhost:4000/hotel/")
            .then((response) => {
                sethotel(response.data);
            })
            .catch((error) => {
            });
        axios
            .get("http://localhost:4000/booking/")
            .then((response) => {
                setbooking(response.data);
            })
            .catch((error) => {
            });
    }, []);
    const handleChange1 = (event) => {
        setfrom(event.target.value);

    };
    const handleChange2 = (event) => {
        setto(event.target.value);
    };

    const handleClickOpen = (id) => {
        sethotelId(id.id);
        sethotelName(id.name);
        sethotelRoom(id.room_count);
        sethotelDetail(id.detail);
        setroomstotal(id.room_count);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeRoomNo = (event) => {
        setnumberofRooms(event.target.value);
    };

    const handleRoomBook = () => {
        if (roomstotal == 0) {
            alert("No Room Available");
        }
        else if (roomstotal - numberofRooms < 0) {
            alert("Not enough rooms available")
        }
        else {
            const newUser1 = {
                in: from,
                out: to,
            };
            var vari = false;
            booking.forEach((users1) => {
                if (users1.tourist_id == localStorage.getItem("tourist_id")) {
                    var dateFrom = users1.check_in;
                    var dateTo = users1.check_out;
                    var dateCheck = newUser1.in;
                    var d1 = dateFrom.split("-");
                    var d2 = dateTo.split("-");
                    var c = dateCheck.split("-");
                    var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);
                    var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
                    var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);
                    var checking1 = check >= from && check <= to;

                    var dateFrom1 = users1.check_in;
                    var dateTo1 = users1.check_out;
                    var dateCheck1 = newUser1.out;
                    var d11 = dateFrom1.split("-");
                    var d21 = dateTo1.split("-");
                    var c1 = dateCheck1.split("-");
                    var from1 = new Date(d11[0], parseInt(d11[1]) - 1, d11[2]);
                    var to1 = new Date(d21[0], parseInt(d21[1]) - 1, d21[2]);
                    var check1 = new Date(c1[0], parseInt(c1[1]) - 1, c1[2]);
                    var checking2 = check1 >= from1 && check1 <= to1;
                    if (checking1 == true || checking2 == true) {
                        vari = true;
                    }
                }
            })
            if (vari == true) {
                alert("Travel dates clashing with another booking!");
            }
            else {
                const newUser = {
                    tourist_id: localStorage.getItem("tourist_id"),
                    hotel_id: hotelId,
                    check_in: from,
                    check_out: to,
                    no_of_room: numberofRooms,
                    hotel_name: hotelName,
                };
                axios
                    .post("http://localhost:4000/booking/book", newUser)
                    .then((response) => {
                        const newUser1 = {
                            id: hotelId,
                            rooms: roomstotal - numberofRooms,
                        };
                        axios
                            .post("http://localhost:4000/hotel/updateroom", newUser1)
                            .then((response) => {
                            })
                            .catch((res) => {
                            }
                            );
                        navigate('/booking')
                    })
                    .catch((res) => {
                    }
                    );
            }
        }
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
                        <Button variant="contained" color="info" onClick={() => { }}>
                            Hotel
                        </Button>
                        <Button color="inherit" onClick={() => navigate("/map")}>
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
            <br />
            <br />
            <Grid container align={'center'}>
                <Grid item xs={12}>
                    {hotel.map((user) => (
                        <>
                            <Card sx={{ maxWidth: 1520 }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Item>
                                                <b>Name</b>
                                                <br /><br />
                                                {user.name}
                                            </Item>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Item>
                                                <b>Room Count</b>
                                                <br /><br />
                                                {user.room_count}
                                            </Item>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Item>
                                                <b>Details</b>
                                                <br /><br />
                                                {user.detail}
                                            </Item>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <br />
                                            <Button variant="contained" onClick={() =>
                                                handleClickOpen({ id: user._id, name: user.name, room_count: user.room_count, detail: user.detail })
                                            }>
                                                Book Room
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <br />
                        </>
                    ))}
                </Grid>
            </Grid>
            <Dialog
                fullWidth={true}
                maxWidth="lg"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Book Room"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Item>
                                    <b>Name</b>
                                    <br /><br />
                                    {hotelName}
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                    <b>Room Count</b>
                                    <br /><br />
                                    {hotelRoom}
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                    <b>Details</b>
                                    <br /><br />
                                    {hotelDetail}
                                </Item>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Number of Rooms *</InputLabel>
                                    <Select
                                        required
                                        value={numberofRooms}
                                        label="Number of Rooms"
                                        onChange={handleChangeRoomNo}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack>
                                    <TextField
                                        label="FROM"
                                        type="date"
                                        value={from}
                                        onChange={handleChange1}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack>
                                    <TextField
                                        label="TO"
                                        type="date"
                                        value={to}
                                        onChange={handleChange2}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {numberofRooms > 0 &&
                        <Button onClick={() => { handleRoomBook() }} autoFocus>
                            Book
                        </Button>
                    }
                    {numberofRooms == 0 &&
                        <Button disabled >
                            Book
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Hotel;
