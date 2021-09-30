import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Login() {

    const styles = useStyles();
    const [loginDetails, setLoginDetails] = useState({ "email": '', "password": '' });
    const [attemptErrors, setAttemptErrors] = useState({});
    const history = useHistory();

    if(localStorage.getItem("jwt")){
        history.push("/portal");
    }

    const submitData = (event) => {
        event.preventDefault();
        setAttemptErrors({});
        if (handleInput) {

            axios.post("http://localhost:3000/login", {
                "email": loginDetails["email"],
                "password": loginDetails["password"]
            })
                .then((data) => {
                    //Succeeded login
                    //save jwt token to local storage
                    let token = data.data.token;
                    if (token) {
                        localStorage.setItem("jwt", token);
                    }
                    history.push("/");
                    //redirect to user portal
                })
                .catch((error) => {
                    console.log(error.response);
                    setAttemptErrors(error.response.data);
                })
        }
    }

    const handleInput = () => {
        if (loginDetails['email'] !== '' && loginDetails['password'] !== '') {
            return true;
        }
        else {
            return false;
        }
    }

    const onChangeData = (event) => {
        setLoginDetails({
            ...loginDetails,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Grid item container direction='column' justifyContent='center' alignItems='center' >
            <Grid item>
                <Typography variant='h5' component='h1'>
                    Login
                </Typography>
            </Grid>
            <form className={styles.root} noValidate autoComplete="off" onSubmit={(e) => submitData(e)}>
                <Grid container direction='column' justifyContent='center' alignItems='center' spacing={3}>
                    <Grid item>
                        <TextField id="standard-basic" label="Email" name="email" value={loginDetails["email"]} onChange={(e) => onChangeData(e)} />

                    </Grid>
                    <Grid item>

                        <TextField id="standard-basic" label="Password" name="password" value={loginDetails["password"]} onChange={(e) => onChangeData(e)} type='password' />
                    </Grid>

                    <Grid item>
                        <Button variant="outlined" type='submit'>Log In</Button>
                    </Grid>
                </Grid>
            </form>

            <Grid item>
                {attemptErrors !== {} && (
                    <div>
                        {Object.values(attemptErrors).map((error, index) => {
                            return <div key={index}>{error}</div>
                        })}
                    </div>
                )}
            </Grid>
        </Grid>
    )
}
