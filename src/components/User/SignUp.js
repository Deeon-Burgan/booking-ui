import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function SignUp() {

    const classes = useStyles();
    const [formDetails, setFormDetails] = useState({"email":'',
                                                    "name":'',
                                                    "password":'',
                                                    "password_confirmation":''});
    
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [attemptErrors, setAttemptErrors] = useState([]);

    const onChangeData = (event) => {
        setFormDetails({
            ...formDetails,
            [event.target.name]:event.target.value
        })
    }

    const submitData = (e) => {
        e.preventDefault();
        if(checkInput()){
            axios.post("http://localhost:3000/user",{
                "user":formDetails
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
                setAttemptErrors(error.data.email);
            })
        }
    }

    const checkInput = () => {
        const succeed = true;
        if(formDetails["password"] !== formDetails["password_confirmation"]){
            setPasswordMatch(false);
            succeed = false;
        }else{
            setPasswordMatch(true);
        }


        return succeed;
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => submitData(e)}>
                <TextField id="standard-basic" label="Email" name="email" value={formDetails["email"]} onChange={(e) => onChangeData(e)}/>
                <TextField id="standard-basic" label="Name" name="name" value={formDetails["name"]} onChange={(e) => onChangeData(e)}/>
                <TextField id="standard-basic" label="Password"  name="password" value={formDetails["password"]} onChange={(e) => onChangeData(e)} type='password'/>
                <TextField id="standard-basic" label="Confirm Password" name="password_confirmation" value={formDetails["password_confirmation"]} onChange={(e) => onChangeData(e)} type='password'/>
                <Button variant="outlined" type='submit'>Sign Up</Button>
            </form>

            {!passwordMatch && (
                <div>
                    PASSWORDS DONT MATCH, FIX IT
                </div>
            )}
            {attemptErrors !== [] && (
                <div>
                    {attemptErrors.map((thingy, index) => {
                        <div key={index}>
                            <p>{thingy}</p>
                        </div>
                    })}
                </div>
            )}
        </div>
    )
}
