import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import validator from 'validator';

const Register = (props) => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setDate(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validator.isEmail(email)) {
      alert('Enter valid Email!')
    }
    else {


      const newUser = {
        name: name,
        email: email,
      };

      axios
        .post("http://localhost:4000/register/", newUser)
        .then((response) => {
          if (response.data == "Email already exists") {
            alert("Email already exists");
          }
          else {
            alert("Registered Successfully");
          }
        })
        .catch((res) => {
          alert(res);
        }
        );

      resetInputs();
    }
  };

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
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br />
      <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
          <Typography variant="h3">
            Register
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
