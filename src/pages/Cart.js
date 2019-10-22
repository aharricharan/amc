import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Cart from "../components/Cart/Cart";
import { updateProductQuantity, deleteProductFromCart, processCart } from "../actions/product";


const CartContainer = (props) => {
  document.title = "Checkout";
	const { cartItems, checkout, updateProductQuantity, deleteProductFromCart, processCart } = props;

  return (
    <Fragment>
      <Cart 
        data={cartItems} 
        updateProductQuantity={updateProductQuantity} 
        deleteProductFromCart={deleteProductFromCart} 
        processCart={processCart}
        checkout={checkout}
      />
    </Fragment>
  );
}

export default connect(state =>
({
  cartItems: state.product.cart,
  checkout: state.productCheckout
}),
({
  updateProductQuantity: updateProductQuantity,
  deleteProductFromCart: deleteProductFromCart,
  processCart: processCart
})
)(CartContainer);