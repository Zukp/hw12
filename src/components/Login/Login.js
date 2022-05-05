import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//deboucing debouce

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');// wrtie some email
  const [emailIsValid, setEmailIsValid] = useState(); // check is email valid or not
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
   

  useEffect(() => {
    
    const timer = setTimeout(() => {

      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6 // условия болуп жатат
      );

    },3000) 
   // clean up function 

    return () => {
      clearTimeout(timer)  // очистка 3000 секундан кийин 
    }
  },[enteredEmail, enteredPassword]) // enteredEmail мн enteredPassword канча жолу алмашса ошончо жолу алмашат  



  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));// текстин ичинде сабачканы издейт
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6); // пробелдерди алып салат жана узундугу 6 чон болсо иштейт
  };

  const submitHandler = (event) => {
    event.preventDefault(); 
    props.onLogin(enteredEmail, enteredPassword);  // App jsтен функция келип жатат ал функцияга enteredEmail мн EnteredPassword кетет
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : '' // enteredIsVlid барабар болсо false анда clase.invalid деген class иштесин болбосом пустой болуп калсын 
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            // onBlur // интуттун ичине бассып кайр алганда иштейт
               // onBlur //инпуттун ичинде сабачка жок болуп калса ушул функция иштейт
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
                // onBlur // интуттун ичине бассып кайр алганда иштейт
               // onBlur //инпуттун ичинде сабачка жок болуп калса ушул функция иштейт
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


