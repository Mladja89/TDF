import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { AuthUser } from '../api/auth'
import { useAuthContext } from '../api/auth'
import { useHistory } from 'react-router-dom'
import * as routes from '../router/routes'
import {
  Typography,
  Button,
  TextField,
  Container,
  makeStyles,
  CssBaseline,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
  Avatar,
  FormControl,
} from '@material-ui/core';
import {Visibility, VisibilityOff, AccountBox} from '@material-ui/icons';
 
const useStyles = makeStyles((theme) => ({
  main: {
    background: '#f1f4f6',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    position: 'relative',
    maxWidth: 'initial',
    overflow: 'hidden',
    "&::after": {
      content: '"🐱"',
      position: 'absolute',
      width: '50vw',
      height: '50vw',
      opacity: '0.3',
      fontSize: '50vw',
      zIndex: '0',
    },
    "& > div": {
      zIndex: '1',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    position: 'absolute',
    padding: '30px 15px',
    paddingTop: '40px',
    maxWidth: '550px',
    borderRadius: "20px",
    boxShadow: '0px 22px 30px #c7c7c7',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#fde396",
    position: 'absolute',
    top: '-30px',
    zoom: '2',
  },
  form: {
    width: '100%',
    paddingRight: "25px",
    marginTop: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1.5),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    width: '25ch',
  },
  welcome: {
    fontWeight: 'bold',
  },
  loginbtn: {
    background: '#0a7bc4',
    color: 'white',
    padding: "20px 0px",
    borderRadius: '20px',
    "&:hover": {
      background: '#0870b3',  
    }
  },
}));

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setshowPassword] = useState(false)
  const { setCurrentUser } = useAuthContext()
  const history = useHistory()
  const classes = useStyles();

  async function handleSubmit() {
    try {
      const user: AuthUser = await Auth.signIn(username, password)
      setCurrentUser(user)
      history.push(routes.home)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  return (
    <Container component="main" className={classes.main}>
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <AccountBox />
      </Avatar>
      <Typography component="h2" variant="h2" className={classes.welcome}>
        Welcome
      </Typography>
      <form className={classes.form} noValidate>
      <TextField  fullWidth id="outlined-basic" label="E-mail" variant="outlined" onChange={(e) => setUsername(e.target.value)} value={username} />
      <FormControl fullWidth  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      <Button
        fullWidth
        type="button"
        variant="contained"
        className={classes.loginbtn}
        onClick={handleSubmit}
        > LOG IN
      </Button>
      </form>
      </div>
    </Container>
  )
}
