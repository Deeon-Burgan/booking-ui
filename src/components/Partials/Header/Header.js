import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import { useHistory, Redirect } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';

export default function Header() {

    const history = useHistory();
    const token = localStorage.getItem("jwt");

    const logout = () => {
        localStorage.removeItem("jwt");
        history.push("/");
    }

    return (
        <Grid item container direction='row' justifyContent='space-between' alignItems='center'>
            <Grid item>
                <Typography>
                    Booking Tracker
                </Typography>
            </Grid>
            <Grid item>
                <Grid container justifyContent='space-between' spacing='5'>
                    {token ?
                        (<Grid item><Button variant="text" onClick={logout}>Logout</Button></Grid>) :
                        (
                            <Grid item container direction='row'>
                                <Grid item>
                                    <Button variant="text" onClick={() => history.push('/login')}>Login</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="text" onClick={() => history.push('/signup')}>Sign Up</Button>
                                </Grid>
                            </Grid>
                        )}

                </Grid>
            </Grid>
        </Grid>
    )
}
