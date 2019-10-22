import { 
   FETCH_PRODUCT_RECEIVED, 
   ADD_PRODUCT_TO_CART, 
   UPDATE_PRODUCT_QUANTITY, 
   DELETE_PRODUCT_FROM_CART, 
   SUBMIT_PRODUCT_START,
   SUBMIT_PRODUCT_SUCCESS,
   SUBMIT_PRODUCT_ERROR
} from "../reducers/product";

//This represents the list page
const products = [
   {
      image: {
         large: "https://cdn.shopify.com/s/files/1/1505/6302/products/wadhoiat10log_large_2x.jpg?v=1568645980"
      },
      title: "The Walking Dead Season 10 T-Shirt",
      description: "As seen on the Season 10 Preview show, this official The Walking Dead Season 10 T-Shirt features a striking design of a Roman numeral X that's formed by Michonne's Katana sword, along with the iconic TWD initials.",
      price: 29.95
   }
];

//I am using the title to find the product, in reality this would be an ID. 
export const fetchProduct = (title) => {
   const product = products.filter(obj => obj.title === title);
   return (dispatch) => {
      dispatch({
         type:FETCH_PRODUCT_RECEIVED,
         payload: product[0]
      })
   }
}

export const addProductToCart = (product) => {
   return (dispatch) => {
      dispatch({
         type:ADD_PRODUCT_TO_CART,
         product: product
      })
   }
}

export const updateProductQuantity = (product) => {
   return (dispatch) => {
      dispatch({
         type:UPDATE_PRODUCT_QUANTITY,
         product: product
      })
   }
}

export const deleteProductFromCart = (product) => {
   return (dispatch) => {
      dispatch({
         type:DELETE_PRODUCT_FROM_CART,
         product: product
      })
   }
}

export const processCart = (data) => {
   return async(dispatch) => {
      dispatch({
         type:SUBMIT_PRODUCT_START
      })
     try {
       const response = await fetch('http://localhost:1337/api/products',
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         }
        );
       const json = await response.json();
      dispatch({
         type:SUBMIT_PRODUCT_SUCCESS,
         payload: json
      })
     }
     catch (err) {
      dispatch({
         type:SUBMIT_PRODUCT_ERROR,
         payload: "error occured"
      })
     }
   }
}