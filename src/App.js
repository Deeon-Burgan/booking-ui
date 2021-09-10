import logo from './logo.svg';
import './App.css';
import react from 'react';
import { Route } from 'react-router-dom';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Grid container direction='column' justifyContent='center' alignItems='center'>
        <Grid container item>
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
