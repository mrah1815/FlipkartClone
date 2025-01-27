import {createStore,combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {thunk} from 'redux-thunk'; 
import { getProductsReducer , getProductDetailsReducer} from './reducers/ProductReducer';
import {cartReducer} from './reducers/CartReducer.js';

const reducer=combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart:cartReducer
});

const middleware=[thunk];

//create store has two arguments one is reducer and another is middleware
const store=createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;