import React from 'react';
import { Route } from 'react-router-dom';

import ProductContainer from "../../pages/Product";
import CartContainer from "../../pages/Cart"

const Routing = (props) => {
  const { locationData } = props;


          if (locationData.pathname === "/product") {
          return (<Route
            path={locationData.pathname}
            component={ProductContainer}
            />)
          } else {
               return (<Route
            path={locationData.pathname}
            component={CartContainer}
            />)     
          }
}

export default Routing;
