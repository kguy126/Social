import { Routes, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/auth";

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Navbar from './component/layout/navbar';

import Landing from './component/layout/landing';
import Login from "./component/layout/auth/login";
import Register from "./component/layout/auth/register";
import Dashboard from "./component/layout/dashboard/dashboard";
import CreateProfile from "./component/layout/create-profile/createProfile";
import EditProfile from "./component/layout/edit-profile/editProfile";
import './App.css';
import store from './store';
import React, {Component} from 'react';
import { clearCurrentProfile } from "./actions/profileActions";
import AddExperience from "./component/layout/add-credentials/addExperience";
import AddEducation from "./component/layout/add-credentials/addEducation";
import Profiles from "./profiles/profiles";
import Profile from "./component/layout/profile/profile";
import Posts from "./component/layout/post/posts";
import Post from "./component/layout/pst/post";


// Check for token 

if(localStorage.jwtToken){

  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp 
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

const time = Date.now() / 1000;
if(decoded.exp < time){
  store.dispatch(logoutUser());

  //Clear current profile 
  
  store.dispatch(clearCurrentProfile());
  //redirect to login
  window.location.href='/login';
}
}

class App extends Component{
  render(){
  return (

    <Provider store = {store}>
    <div className = "App">

<Navbar />

       <Routes>
      
      <Route path="/" element={ <Landing/> } />
      
      <Route path="/login" element={ <Login/> } />
      <Route path="/register" element={ <Register/> } />
      <Route path="/dashboard" element={ <Dashboard/> } />
      <Route path="/create-profile" element={ <CreateProfile/> } />
      <Route path="/edit-profile" element={ <EditProfile/> } />
      <Route path="/add-experience" element={ <AddExperience/> } />
      <Route path="/add-education" element={ <AddEducation/> } />
      <Route path="/profiles" element={ <Profiles/> } />
      <Route path="/profile/:id" element={ <Profile/> } />
      <Route path="/feed" element={ <Posts/> } />
      <Route path="/post/:id" element={ <Post/> } />
      </Routes>
 
</div>
</Provider>
  );
}
}


export default App;
