import { combineReducers } from "redux";

import { product, productCheckout } from "./product";


export default combineReducers({
	product,
	productCheckout
})