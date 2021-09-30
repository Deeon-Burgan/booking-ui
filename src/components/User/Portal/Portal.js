import React, {useState, useEffect} from 'react'
import { Grid } from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import { Calendar } from '@material-ui/pickers'
import { findAllByDisplayValue } from '@testing-library/dom';
import DateFnsUtils from "@date-io/date-fns";
import {makeStyles} from '@material-ui/core/styles';
const axios = require('axios');

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },

    list: {
        float: 'left',
        width: '90vw',
        listStyle: 'none'
    },

    li: {
        textAlign: 'left',
        height: '3vh',
        lineHeight: '3vh',
        borderTop: '1px solid black'
    },

    liLast: {
        textAlign: 'left',
        height: '3vh',
        lineHeight: '3vh',
        borderTop: '1px solid black',
        borderBottom: '1px solid black'
    }
  });

export default function Portal() {

    const [cDate, setCDate] = useState(new Date());
    let bookings = [];

    const classes = useStyles();
    axios.defaults.headers.common['Authorization'] =  `Bearer ${localStorage.getItem("jwt")}`
    
    const cday = cDate.getDate();
    const cmonth = cDate.getMonth();
    // console.log('cday = ' + cday + ' cmonth = ' + cmonth);
    // console.log(day + ' of ' + (month + 1));

    const [dayBookings, setDayBookings] = useState([]);



    useEffect(() => {
        setDayBookings([]);
        axios.get("http://localhost:3000/bookings")
        .then((data) =>{
            bookings = data.data.bookings;
            return bookings;
        })
        .then((data)=>{
            let arr = [];
            data.forEach((element, index) => {
                let date = new Date(element.date_time);
                let month = date.getUTCMonth();
                let day = date.getUTCDate();

                if(cday === day && month == cmonth){
                    arr = [...arr, element];
                }

                setDayBookings(arr);
            });
        })
    }, [cDate])

    let hours = () => {
        return <ul className={classes.list}>
            {Array.from(Array(24), (e, i) => {
                return (i === 23) ? <li key={i} className={classes.liLast}>{i + 1}</li> : <li key={i} className={classes.li}>{i + 1}</li>
            })}
        </ul>
    }

    let bookingView = () => {
        
    }

    return (
        <Grid item container justifyContent='center' alignItems='center'>
            <Grid item container direction='column'>

            <Grid item>
            <Calendar date={cDate} onChange={(date) => setCDate(date)} size='large'/>
            </Grid>
            {hours()}
            </Grid>
            {(dayBookings.length > 0) && <div>
                {dayBookings.map((element) => {
                    return <li>{element.id}</li>
                })}
                </div>}
        </Grid>
    )
}
