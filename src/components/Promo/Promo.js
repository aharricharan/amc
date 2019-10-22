import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';


const useStyles = makeStyles({
  promo: {
    display: "flex",
    alignItems: "baseline"
  },
  button: {
    display: "flex",
    backgroundColor: "#2C2017",
    height: "58px",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#A30F0F"
    }
  },
  textField: {
    maxWidth: "300px"
  }
});

const Promo = (props) => {
  const { data, handlePromoChanges } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleButton = () => {
    handlePromoChanges(value);
  };
  const handleTextChange = (event) => {
    setValue(event.target.value);
  }

  return (
      <div className={classes.promo}>
        <TextField
          id="standard-name"
          label="Promo code"
          className={classes.textField}
          value={value ? value : data.value}
          margin="normal"
          variant="outlined"
          onChange={handleTextChange}
        />
       <Button 
         onClick={handleButton}
         variant="contained" 
         color="primary" 
         classes={{ root: classes.button}}
       >
          Apply
        </Button>
      </div>
  );
}

export default Promo;