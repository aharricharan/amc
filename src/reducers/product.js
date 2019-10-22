export const FETCH_PRODUCT_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCT_RECEIVED = "FETCH_PRODUCTS_RECEIVED";
export const FETCH_PRODUCT_ERROR = "FETCH_PRODUCTS_ERROR";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const UPDATE_PRODUCT_QUANTITY = "UPDATE_PRODUCT_QUANTITY";
export const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
export const PROCESS_CART = "PROCESS_CART";
export const SUBMIT_PRODUCT_START = "SUBMIT_PRODUCT_START";
export const SUBMIT_PRODUCT_SUCCESS = "SUBMIT_PRODUCT_SUCCESS";
export const SUBMIT_PRODUCT_ERROR = "SUBMIT_PRODUCT_ERROR";


export const product = (state = {
	product:null,
	fetching: false,
	fetched: false,
	error:null,
	cart: []
}, action) => {
	switch(action.type) {
		case FETCH_PRODUCT_START:
			return {...state, fetching: true}
		break;
		case FETCH_PRODUCT_RECEIVED:
			return {...state, fetching: false, fetched:true, product: action.payload}
		break;
		case FETCH_PRODUCT_ERROR:
			return {...state, fetching: false, error: action.payload}
		break;
		case ADD_PRODUCT_TO_CART:
			const updatedCart = [...state.cart];
			updatedCart.push(action.product);
			return {...state, cart: updatedCart}
		break;
		case UPDATE_PRODUCT_QUANTITY: {
			const productsInCart = state.cart.map(product => ({...product}));
			const updatedProduct = productsInCart.map(item => {
				if (item.title === action.product.title) {
					item.quantity = action.product.quantity
				}
			});
			return {...state, cart: productsInCart}
		break;
		}
		case DELETE_PRODUCT_FROM_CART: {
			const productsInCart = state.cart.map(product => ({...product}));
			const updatedProduct = productsInCart.filter(item => {
				return item.title !== action.product.title
			});
			return {...state, cart: updatedProduct}
		break;
		}
	}
	return state;
}

export const productCheckout = (state = {
	submitting: false,
	submitted: false,
	error:null,
	response: null
}, action) => {
	switch(action.type) {
		case SUBMIT_PRODUCT_START:
			return {...state, submitting: true, error: null}
		break;
		case SUBMIT_PRODUCT_SUCCESS:
			return {...state, submitting: false, submitted:true, response: action.payload, error: null}
		break;
		case SUBMIT_PRODUCT_ERROR:
			return {...state, submitting: false, error: action.payload}
		break;
	}
	return state;
}