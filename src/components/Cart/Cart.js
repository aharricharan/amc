import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import {
TextField,
FormControl,
InputLabel,
Input,
FormHelperText,
Button,
Snackbar
  } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

import { formatDollar } from '../../common/helpers';
import validation from '../../common/validation';
import Promo from "../Promo/Promo";


const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #DDD",
    alignItems: "baseline",
    paddingBottom: "5px",
    "& > div:first-child": {
      fontSize: "20px"
    },
    "& > div:last-child": {
      color: "#555",
      fontSize: "13px"
    }
  },
  items: {
    display: "flex",
    padding: "10px 0",
    borderBottom: "1px solid #DDD",
    "& > div": {
      display: "flex",
        "& > div": {
          flexGrow: 1
        }
    }    

  },
  image: {
    maxWidth: "100px"
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
  textField: {
    maxWidth: "50px",
    marginBottom: "20px",
    "& > label:focused": {
      color: "red"
    }
  },
  form: {
    marginTop: "20px"
  },
  formControl: {
    width: "100%"
  },
  actionElements: {
    display: "flex",
    alignItems: "center",
  },
  deleteContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    marginLeft: "20px",
    paddingLeft: "20px",
    borderLeft: "1px solid #DDD",
    top: "-3px",
    "& > svg": {
      fontSize: "32px",
      cursor: "pointer"
    },
    "& > div": {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: "13px",
      cursor: "pointer"
    }
  },
  names: {
    display: "flex",
    "& > div:first-child": {
      marginRight: "20px"
    }
  },
  subtotalDiscountContainer: {
    textAlign: "right",
    paddingTop: "5px",
    "& > span": {
      paddingLeft: "5px"
    },
    "& > span:last-child": {
      color: "#B12704",
      fontWeight: 500
    }
  },
  cartButton: {
    display: "block",
    marginTop: "10px",
    backgroundColor: "#A30F0F",
    "&:hover": {
      backgroundColor: "#2C2017"
    }
  },
  promo: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

const Cart = (props) => {
  const { data, updateProductQuantity, deleteProductFromCart, processCart, checkout } = props;
  const classes = useStyles();
  const totalQuantity = data.reduce((total, obj) => (total + obj.quantity), 0);
  const subTotalPrice = data.reduce((total, obj) => (total + (obj.quantity * obj.price)), 0);
  const promoCode = queryString.parse(window.location.search);
  const [promoObject, setPromoObject] = React.useState({
   valid: false,
   value: ""
  });
  const PROMO_CODE = "SPECIALFAN";
  useEffect(() => {
  if (promoCode.promo === PROMO_CODE) {
    setPromoObject({
      valid: promoCode.promo === PROMO_CODE,
      value: promoCode.promo
    })
  }
  },[]);
  const promoDiscount = promoObject.valid ? subTotalPrice * .20 : 0;
  const totalPrice = subTotalPrice - promoDiscount;

   const [formObject, setForm] = React.useState({
     firstName: "",
     lastName: "",
     email: "",
     address: ""
   });

   const [formError, setFormError] = React.useState({
     firstName: "",
     lastName: "",
     email: "",
     address: ""
   });

   const [open, setOpen] = React.useState(false);
   const [transition] = React.useState(undefined);

   const closeSnackbar = () => {
     setOpen(false);
   }

  const handleChange = name => event => {
    setForm({ ...formObject, [name]: event.target.value });
  };
  const handleQuantityChange = (event, product) => {
     if (event.target.value > 0) {
      product.quantity = parseInt(event.target.value);
      updateProductQuantity(product);
   }
  };
  const handleDelete = (product) => {
    deleteProductFromCart(product);
  };
  const handleCartSubmit = () => {
     
    const err = validation(formObject);
      const errors = {
        firstName: "",
        lastName: "",
        email: "",
        address: ""
      }
    if (err.errors.length) {
      for (const item of err.errors) {
          if (item.property === "instance.email") {
            errors.email = "Email is not valid"
          } else {
            const name = item.property.substring(item.property.lastIndexOf(".")+1);
            errors[name] = item.schema.displayName + " " + item.message;
          }
      }
      setFormError(errors);
    } else {
        const sendData = {
          user: formObject,
          items: data
        }
        setOpen(true);
        processCart(sendData);
    }
  };

  const handlePromoChanges = (value) => {
      setPromoObject({
        valid: value === PROMO_CODE,
        value: value
      });
  }

  let statusMessage = "";
  if (checkout.submitting) {
    statusMessage = "Sending....";
  } else if (checkout.error) {
    statusMessage = "Error occured. Try again";
  } else if (checkout.response) {
    statusMessage = "Order placed";
  }

  if (!data.length) {
    return (<div>Your shopping cart is empty.</div>)
  }
  return (
      <div>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        onClose={closeSnackbar}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={
          <span>{statusMessage}</span>
        }
      />
      <div className={classes.header}>
        <div>Shopping Cart</div>
        <div>Price</div>
      </div>
        {
          data.map(item => {
            return (
              <div key={item.title} className={classes.items}>
              <div>
                <div>
                  <img alt="shirt" className={classes.image} src={item.image.large} />
                </div>
                <div className={classes.descriptionContainer}>
                  <div className={classes.descriptionTitle}>{item.title}</div>
                  <div className={classes.descriptionText}>{item.description}</div>
                  <div className={classes.actionElements}>
                    <div>
                      <TextField
                        classes={{root: classes.textField}}
                        id={item.title}
                        label="Quantity"
                        value={item.quantity}
                        onChange={(event) => handleQuantityChange(event, item)}
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                    </div>
                    <div onClick={() =>handleDelete(item)} className={classes.deleteContainer}>
                      <div>Delete</div>
                      <Delete />
                    </div>
                  </div>
                </div>
                </div>
                <div>
                  <div className={classes.descriptionPrice}>{formatDollar(item.price)}</div>
                </div>
              </div>
            )
          })
        }
        <div className={classes.subtotalDiscountContainer}>
          <span>Subtotal</span>
          <span>({totalQuantity} items)</span>
          <span>{formatDollar(subTotalPrice)}</span>
        </div>
        {
          promoObject.valid && <div className={classes.subtotalDiscountContainer}>
          <span>Promo discount(20%) -</span><span>{formatDollar(promoDiscount)}</span>
        </div>
        }
        { promoObject.valid && <div className={classes.subtotalDiscountContainer}>
          <span>Total</span><span>{formatDollar(totalPrice)}</span>
        </div>
        }
        <div className={classes.promo}>
        <Promo data={promoObject} handlePromoChanges={handlePromoChanges} />
        </div>
        <div className={classes.form}>
        <div className={classes.names}>
      <FormControl className={classes.formControl} error={formError.firstName !== ""}>
        <InputLabel htmlFor="component-error">First name</InputLabel>
        <Input
          id="component-error"
          onChange={handleChange("firstName")}
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">{formError.firstName}</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} error={formError.lastName !== ""}>
        <InputLabel htmlFor="component-error">Last name</InputLabel>
        <Input
          id="component-error"
          onChange={handleChange("lastName")}
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">{formError.lastName}</FormHelperText>
      </FormControl>
      </div>
      <div>
            <FormControl className={classes.formControl} error={formError.email !== ""}>
        <InputLabel htmlFor="component-error">Email</InputLabel>
        <Input
          id="component-error"
          onChange={handleChange("email")}
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">{formError.email}</FormHelperText>
      </FormControl>
      </div>
      <div>
            <FormControl className={classes.formControl} error={formError.address !== ""}>
        <InputLabel htmlFor="component-error">Address</InputLabel>
        <Input
          id="component-error"
          onChange={handleChange("address")}
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">{formError.address}</FormHelperText>
      </FormControl>
      </div>
                 <Button 
             onClick={handleCartSubmit}
             variant="contained" 
             color="primary" 
             classes={{ root: classes.cartButton}}
           >
              Place your order
            </Button>
      </div>
      </div>
  );
}

export default Cart;
