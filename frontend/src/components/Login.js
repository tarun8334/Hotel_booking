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

const Login = (props) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validator.isEmail(email)) {
      alert('Enter valid Email!')
    }
    else {
      const newUser = {
        email: email,
      };

      axios
        .post("http://localhost:4000/register/login", newUser)
        .then((res) => {
          alert("Logged in Successfully");
          localStorage.setItem('tourist_id', res.data._id);
          navigate("/hotel");
        })
        .catch(() => {
          alert("Email doesn't exist");
        })
        ;

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
            <Button color="inherit" onClick={() => navigate("/")}>
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br />
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">
            Login
          </Typography>
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
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
