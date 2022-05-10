import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//debouncing, debounce
const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      ...prevState,
      value: action.emailValue,
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      ...prevState,
      value: prevState.value,
    };
  }
  if(action.type === 'USER_INPUTT'){
    return {
      ...prevState,
      valuePass:action.passValue,
    }
  }
  if(action.type === 'USER_BLURR'){
    return {
      ...prevState,
      valuePass:prevState.valuePass,
    
    }
  }
  return {
    value: '',
    isValid: false,
    valuePass:'',
    isPassword:'',
  };
  
};
const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    isValid: undefined,
    value: '',
    valuePass:'',
    isPassword:'',
  });
  // const [enteredEmail, setEnteredEmail] = useState('text'); // write some email
  // const [emailIsValid, setEmailIsValid] = useState(); // check is email valid or not
  // const [enteredPassword, setEnteredPassword] = useState(''); // write some password
  // const [passwordIsValid, setPasswordIsValid] = useState(); // check is password valid or not

  const [formIsValid, setFormIsValid] = useState(false); // email and password are valid

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailState.value.includes('@') && emailState.valuePass.trim().length > 6);
    }, 3000);
    // clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [emailState.value, emailState.valuePass]);
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', emailValue: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchEmail({type:'USER_INPUTT',passValue:event.target.value})
  };
  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({ type: 'INPUT_BLUR' });
  };
  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchEmail({type:'USER_BLURR'})
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value,emailState.valuePass);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${emailState.isPassword === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={emailState.valuePass}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;