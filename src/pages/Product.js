import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Product from "../components/Product/Product";
import { fetchProduct, addProductToCart } from "../actions/product";


const ProductContainer = (props) => {
  document.title = `Product`;
	const { product, fetchProduct, addProductToCart } = props;
	useEffect(() => {
    if (!product) {
      const title = "The Walking Dead Season 10 T-Shirt"; //this would have came from the URL
      props.fetchProduct(title);
    }
	});

  return (
    <Fragment>
      <Product locationData={props.history} data={product} addProductToCart={addProductToCart} />
    </Fragment>
  );
}

export default connect(state =>
({
  product: state.product.product
}),
({
  fetchProduct: fetchProduct,
  addProductToCart: addProductToCart
})
)(ProductContainer);