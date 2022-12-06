import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../../actions/auth";
import TextFieldGroup from "../common/textFieldGroup";
import withNavigateHook from "./withNavigateHook";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  






  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.navigation("/dashboard");
    }
   

    if (nextProps.errors) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.navigation);
  }
  render() {
    const { errors } = this.state;
    const {isAuthenticated} = this.props.auth;
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div>
        <section className="container">
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Sign into Your Account
          </p>
          <form noValidate className="text-danger"onSubmit={this.onSubmit}>
            <TextFieldGroup
            placeholder="Email Address"
            name = "email"
            type="email"
            value={this.state.email}
            onChange= {this.onChange}
            error= {errors.email}            
            />
  
          <TextFieldGroup
            placeholder="Password"
            name = "password"
            type="password"
            value={this.state.password}
            onChange= {this.onChange}
            error= {errors.password}            
            />
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </section>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
 
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});



export default connect(mapStateToProps, { loginUser })(withNavigateHook(Login));


