import logo from './logo.svg';
import './App.css';
import react from 'react';
import { Route } from 'react-router-dom';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import { Grid } from '@material-ui/core';
import CreateBooking from './components/Bookings/CreateBooking';
import HomePage from './components/HomePage/HomePage';
import Portal from './components/User/Portal/Portal';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

function App() {
  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container direction='column' justifyContent='center' alignItems='center'>
          <Grid container item direction='column' justifyContent='center' alignItems='center'>
            <Route exact path='/' component={HomePage} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='/booking' component={CreateBooking} />
            <Route path='/portal' component={Portal} />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
