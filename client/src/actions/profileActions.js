import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES } from "./types";


export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
    .then(res => 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
        )
        .catch(err=>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
            )
}


//Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//CREATE PROFILE

export const createProfile = (profileData,navigation)=> dispatch => {
    
    axios
    .post('api/profile',profileData)
    .then(res=>navigation('/dashboard'))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        
        );
    };

//Add experience 
export const addExperience = (expData, navigation) => dispatch =>{
    axios
    .post('api/profile/experience',expData)
    .then(res=>navigation('/dashboard'))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        
        );

};

//Add education
export const addEducation = (eduData, navigation) => dispatch =>{
    axios
    .post('api/profile/education',eduData)
    .then(res=>navigation('/dashboard'))
    .catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        
        );

};

//DELETE EXOERIENCE
export const deleteExperience = id=> dispatch => {
    if(window.confirm("CONFIRM")){
        axios
        .delete(`api/profile/experience/${id}`)
        .then(res=>
            dispatch({
                type: GET_PROFILE ,
                payload: res.data
            }))
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            
            );
        };
    

    }

    //DELETE EXOERIENCE
export const deleteEducation = id=> dispatch => {
    if(window.confirm("CONFIRM")){
        axios
        .delete(`api/profile/education/${id}`)
        .then(res=>
            dispatch({
                type: GET_PROFILE ,
                payload: res.data
            }))
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            
            );
        };
    

    }


//DELETE PROFILE and Account

export const deleteAccount = ()=> dispatch => {
    if(window.confirm("CONFIRM")){
        axios
        .delete('api/profile')
        .then(res=>
            dispatch({
                type: SET_CURRENT_USER ,
                payload: {}
            }))
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            
            );
        };
    

    }


    //Get all profiles
    export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
    .then(res => 
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
        
        )
        .catch(err=>
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
            )
}


    //Get profile by handle
    export const getProfileByHandle = (handle) => dispatch => {
        dispatch(setProfileLoading());
        axios.get(`/api/profile/handle/${handle}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            
            )
            .catch(err=>
                dispatch({
                    type: GET_PROFILE,
                    payload: null
                })
                )
    }
  


//Clear Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}