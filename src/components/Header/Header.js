import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge
  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles({
  cart: {
    flexGrow: 1,
    textAlign: "right"
  },
  header: {
    marginBottom: "30px",
    backgroundColor: "#2C2017"
  },
  badge: {
    backgroundColor: "#B12704"
  },
  link: {
    color: "#fff"
  }
});

const Header = (props) => {
  const { data, historyData } = props;
  const classes = useStyles();

  const handleCart = () => {
    const promo = queryString.parse(historyData.location.search);
    if (Object.keys(promo)) {
      historyData.push(`/checkout?${queryString.stringify(promo)}`);
    } else {
      historyData.push("/checkout");
    }
  };

  return (
      <AppBar classes={{root: classes.header}} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img alt="AMC" src="https://dimages.amcnetworks.com/78x/cdn.amcnetworks.com/amc/theme/web/amc_logo_bk_bg.png"/>
            <div className={classes.cart}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleCart}
                color="inherit"
              >
                <Badge badgeContent={data} classes={{badge: classes.badge}}>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
  );
}

export default Header;
