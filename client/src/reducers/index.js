import {combineReducers} from 'redux';
import authReducer from './auth';
import errorReducer from './error';
import postReducer from './postReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer
});
