import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import queryString from 'query-string';

import { formatDollar } from '../../common/helpers'


const useStyles = makeStyles({
  root: {
    display: "flex",
    
    "& > div": {
      flexGrow: 1
    }
  },
  image: {
    maxWidth: "400px"
  },
  descriptionContainer: {
    marginLeft: "20px"
  },
  descriptionTitle: {
    fontWeight: 500,
    marginBottom: "10px"
  },
  descriptionText: {
    marginBottom: "10px"
  },
  descriptionPrice: {
    color: "#B12704",
    fontSize: "18px"
  },
  descriptionBottomContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textField: {
    maxWidth: "50px",
    marginBottom: "20px",
    "& > label:focused": {
      color: "red"
    }
  },
  cartButton: {
    display: "block",
    backgroundColor: "#2C2017",
    "&:hover": {
      backgroundColor: "#A30F0F"
    }
  },
});

const Product = (props) => {
  const { data, addProductToCart, locationData } = props;
  const classes = useStyles();
  const [quantity, setQuantity] = React.useState(1);
  const handleQuantityChange = event => {
    if (event.target.value > 0) {
      setQuantity(event.target.value);
    }
  };
  const handleCart = () => {
    const updatedProduct = {...data};
    updatedProduct.quantity = quantity;
    addProductToCart(updatedProduct)
    const promo = queryString.parse(locationData.location.search);
    if (Object.keys(promo)) {
      locationData.push(`/checkout?${queryString.stringify(promo)}`);
    } else {
      locationData.push("/checkout");
    }
  }
  if (!data) {
    return null;
  }
  return (
      <div className={classes.root}>
        <div>
          <img className={classes.image} src={data.image.large} />
        </div>
        <div className={classes.descriptionContainer}>
          <div className={classes.descriptionTitle}>{data.title}</div>
          <div className={classes.descriptionText}>{data.description}</div>
            <div className={classes.descriptionPrice}>{formatDollar(data.price)}</div>
            <TextField
              classes={{root: classes.textField}}
              id="quantity"
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
           <Button 
             onClick={handleCart}
             variant="contained" 
             color="primary" 
             classes={{ root: classes.cartButton}}
           >
              Add to Cart
            </Button>
        </div>
      </div>
  );
}

export default Product;
