import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Header from "./components/Header/Header";
import Routing from "./components/Routing/Routing";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    fontFamily: 'Roboto'
  },
  body: {
    justifyContent: "center",
    display: "flex",
  },
  container: {
    maxWidth: "1000px"
  }
});

const App = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header historyData={props.history} data={props.cartItems} />
      <section className={classes.body}>
        <div className={classes.container}>
          <Routing locationData={props.location} />
        </div>
      </section>
    </div>
  );
}

export default connect(state =>
({
  cartItems: state.product.cart.length
})
)(App);