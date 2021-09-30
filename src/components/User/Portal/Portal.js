import React, {useState, useEffect} from 'react'
import { Grid } from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import { Calendar } from '@material-ui/pickers'
import { findAllByDisplayValue } from '@testing-library/dom';
import DateFnsUtils from "@date-io/date-fns";
const axios = require('axios');

export default function Portal() {

    const [cDate, setCDate] = useState(new Date());
    let bookings = [];

    axios.defaults.headers.common['Authorization'] =  `Bearer ${localStorage.getItem("jwt")}`
    

    useEffect(() => {
        axios.get("http://localhost:3000/bookings")
        .then((data) =>{
            bookings = data.data.bookings;
            console.log(bookings);
            console.log(bookings[5].date_time);
            console.log(new Date(bookings[5].date_time).getUTCHours())
        })
    }, [])

    let hours = () => {
        return <ul>
            {Array.from(Array(24), (e, i) => {
                return <li key={i}>{i + 1}</li>
            })}
        </ul>
    }

    return (
        <Grid item container justifyContent='center' alignItems='center'>
            <Grid item container direction='column'>

            <Grid item>
            <Calendar date={cDate} onChange={(date) => setCDate(date)} size='large'/>
            </Grid>
            {hours()}
            </Grid>
        </Grid>
    )
}
