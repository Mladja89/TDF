import React from 'react'
import { User } from '../api/types'
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

import {
  Typography,
  Button,
  Box,
} from '@material-ui/core';

type Props = {
  user: User
  isEditable?: boolean
  onSave?: (data: any) => void
  isLoading?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '& > :nth-child(1)': {
        padding: '20px 20px',
        fontWeight: 'bold', 
      },
      background: 'white',
      borderRadius: '15px',
    },
    cstmbtn: {
      background: '#f5f5f5',
      padding: '15px 50px',
      fontWeight: 'bold',
    },
    cstmbtnred: {
      background: '#e84c4c',
    }
  }),
);

const StyledBox = withStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    padding: '10px 30px',
    borderBottom: '1px solid #d8d8d8',
    '&:last-child': {
      borderBottom: 'none'
    },
    '& p': {
      fontWeight: 'bold',
      width: '100px',
      marginRight: 'auto',
    },
    '& div': {
      marginRight: 'auto'
    },
  }
}),
)(Box);

export function UserProfile({ user, isEditable, onSave }: Props) {
  const classes = useStyles();
  const [editable, setEditable] = React.useState(false);
  const initialValues = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
  }
  const [submitData, setSubmitData] = React.useState(initialValues);

  const handleEditable = () => {

    setEditable(!editable)
  };

  const handleCancel = () => {
    setSubmitData(initialValues)
    setEditable(false)
  };

  const handleSave = () => {
    onSave?.(submitData)
    setEditable(false)
  };

  return <div>
    <Typography component="h2" variant="h2">{user.first_name} {user.last_name}</Typography>
    <form className={classes.root} noValidate autoComplete="off">
      <Typography component="h5" variant="h5">Account information</Typography>
      <StyledBox>
        <Typography>First name:</Typography>
        <Input value={submitData.first_name} disableUnderline onChange={e => setSubmitData({ ...submitData, first_name: e.target.value })} disabled={!editable} />
      </StyledBox>
      <StyledBox>
        <Typography>Last name:</Typography>
        <Input value={submitData.last_name} disableUnderline onChange={e => setSubmitData({ ...submitData, last_name: e.target.value })} disabled={!editable} />
      </StyledBox>
      <StyledBox>
        <Typography>Email:</Typography>
        <Input value={submitData.email} disableUnderline onChange={e => setSubmitData({ ...submitData, email: e.target.value })} disabled={!editable} />
      </StyledBox>
      <StyledBox>
        <Typography>Phone:</Typography>
        <Input value={submitData.phone} disableUnderline onChange={e => setSubmitData({ ...submitData, phone: e.target.value })} disabled={!editable} />
      </StyledBox>
      <StyledBox style={editable ? {display: 'none'} : {}}>
        <Typography>Role:</Typography>
        <Input value={user.role} disableUnderline disabled />
      </StyledBox>
      <StyledBox style={editable ? {display: 'none'} : {}}>
        <Typography>Status:</Typography>
        <Input value={user.status} disableUnderline disabled />
      </StyledBox>
      <StyledBox>
      {isEditable && !editable && <Button style={{ marginLeft: 'auto'}} className={classes.cstmbtn} onClick={handleEditable}>Edit</Button>}
    {editable && <Button className={classes.cstmbtn} onClick={handleCancel}>Cancel</Button>}
    {editable && <Button className={`${classes.cstmbtn} ${classes.cstmbtnred}`} onClick={handleSave}>Save</Button>}
      </StyledBox>
    </form>
  </div>
}
