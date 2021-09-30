import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
// import Moment from 'react-moment';
import { Grid } from '@material-ui/core';
import moment from 'moment'
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function CreateBooking() {

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`
    const classes = useStyles();

    const [bookingDetails, setBookingDetails] = useState({
        'date_time': '',
        'title': '',
        'duration': '',
        'details': ''
    })

    const onChangeData = (event) => {
        setBookingDetails({
            ...bookingDetails,
            [event.target.name]: event.target.value
        })
    }

    const submitData = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/booking", {
            "booking": bookingDetails
        })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => submitData(e)}>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid item>
                        <TextField
                            id="datetime-local"
                            label="Next appointment"
                            type="datetime-local"
                            className={classes.textField}
                            name='date_time'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={bookingDetails["date_time"]}
                            onChange={(e) => {
                                onChangeData(e);
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField id="standard-basic" label="Title" name="title" value={bookingDetails["title"]} onChange={(e) => onChangeData(e)} />
                    </Grid>
                    <Grid item>

                        <TextField id="standard-basic" label="Duration" name="duration" value={bookingDetails["duration"]} onChange={(e) => onChangeData(e)} />
                    </Grid>
                    <Grid item>

                        <TextField id="standard-basic" label="Details" name="details" value={bookingDetails["details"]} onChange={(e) => onChangeData(e)} />
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" type='submit'>Submit</Button>
                    </Grid>
                </Grid>
            </form>

        </div>
    )
}
