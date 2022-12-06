import React, { Component } from 'react';
import withNavigateHook from './auth/withNavigateHook';
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {logoutUser} from '../../actions/auth'
import {clearCurrentProfile} from '../../actions/profileActions'

 class Navbar extends Component {

  onLogoutClick(e){
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const {isAuthenticated, user} = this.props.auth;
    const {profile, loading} = this.props.profile;
    const authLink = (
      <ul>
        <li><Link to="/profiles">Authors</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/feed">Posts</Link></li>
        <li ><a href = "#"onClick={this.onLogoutClick.bind(this)}>
          <img src={user.avatar} alt={user.name} style={{width: '25px', marginRight: '5px'}}/>{' '}Logout</a></li>
         
        </ul>
    );

    const guestLink = (
      <ul>
          <li><Link to="/profiles">Authors</Link></li>
          <li><Link to="/login">Log in</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/dashboard" >Author Social</Link>
        </h1>

        {isAuthenticated? authLink : guestLink}
        
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
 
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile

});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withNavigateHook(Navbar));



