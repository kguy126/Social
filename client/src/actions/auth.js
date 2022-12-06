import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';



import {GET_ERRORS, SET_CURRENT_USER} from './types';



// Register User
export const register = (userData,navigation)=> dispatch => {
    
    axios
    .post('api/users/register',userData)
    .then(res=>navigation('/login'))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        
        );
    };


// login - Get User Token

export const loginUser = userData => dispatch =>{
    axios
    .post('api/users/login',userData)
    .then(res=>{

        const{ token } = res.data;

        localStorage.setItem('jwtToken', token);

        //Set token to Auth heador 
        setAuthToken(token);

        //DECODE TOKEN TO GET USER DATA
        const decoded = jwt_decode(token);

        dispatch(setCurrentUser(decoded));

    })
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        
        );
    };


//Set logged in user 

export const setCurrentUser = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser =()=> dispatch =>{
    localStorage.removeItem('jwtToken');

    setAuthToken(false);

    //Set current user to { } and isauthenticated = false
    dispatch(setCurrentUser({}));
   

};

