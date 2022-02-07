import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../Service/api';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function Add() {
  const classes = useStyles()
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), employee_name: '', employee_email: '',employee_Username: '' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
    inputFields.map(async(inputF)=>{
      await addUser(inputF);  
    })
    
    window.alert("User added Succesfully")
    navigate('/');
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),  employee_name: '', employee_email: '',employee_Username: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  return (
    <Container>
      <h1>Add New Member</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
          <div key={inputField.id}>
            <TextField
              name="employee_name"
              label="Name"
              variant="filled"
              value={inputField.employee_name}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
              name="employee_email"
              label="email"
              variant="filled"
              value={inputField.employee_email}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
              name="employee_Username"
              label="Username"
              variant="filled"
              value={inputField.employee_Username}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <IconButton disabled={inputFields && inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        )) }
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          onClick={handleSubmit}
        >Submit</Button>
      </form>
    </Container>
  );
}

export default Add;