
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 170,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropDownMenu(props) {

    const {name, currState,valueArray, setState, onSelectHandler} = props;
    console.log('value array is ', valueArray);
    
  const classes = useStyles();
 
  const mianCategorySelectHandler = (e)=>{
    setState(e.target.value);
  }
  const handleChange = (event) => {
    setState(event.target.value);
    
    if (onSelectHandler!==null){
      onSelectHandler(event);

    }
      }

  return(

    <FormControl required variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={currState}
          onChange={handleChange}
        >

            {
            valueArray.map(value=>{
                return(
                    <MenuItem value={value._id}>{value.name}</MenuItem>
                )
            })}
        
        </Select>
      </FormControl>
  )
}