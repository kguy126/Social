import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const middleware = [thunk];

const intialState = {};
const store = createStore(
    rootReducer,
    intialState ,
    composeWithDevTools(applyMiddleware(...middleware))
  );
export default store;