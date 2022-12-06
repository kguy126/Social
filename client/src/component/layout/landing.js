
import React, { Component } from "react";
import PropTypes from "prop-types";
import withNavigateHook from './auth/withNavigateHook';
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
class Landing extends Component {



  render(){
    const {isAuthenticated} = this.props.auth;
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Author Social</h1>
          <p className="lead">
            Create a profile and collaborate with other Authors
          </p>
          <div className="btn-group">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
}

Landing.propTypes = {

  auth: PropTypes.object.isRequired
  
 
};

const mapStateToProps = (state) => ({
  auth: state.auth,

});

export default connect(mapStateToProps)(withNavigateHook(Landing));