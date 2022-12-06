import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import { Link, Navigate} from 'react-router-dom';
import { register } from '../../../actions/auth';

import withNavigateHook from './withNavigateHook';
import TextFieldGroup from "../common/textFieldGroup";



class Register extends Component {
constructor(){

  super();
this.state ={
  name: '',
  email: '',
  password: '',
  password2: '',
  errors: {}

};

this.onChange = this.onChange.bind(this);
this.onSubmit = this.onSubmit.bind(this);

}

componentDidMount(){
  if(this.props.auth.isAuthenticated){
    this.props.navigation("/dashboard");
  }
};


componentWillReceiveProps(nextProps){
  if(nextProps.errors){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
}

onChange (e){
  this.setState({[e.target.name]: e.target.value});

  }
    

onSubmit(e){
    e.preventDefault();

  const newUser = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    password2: this.state.password2
  }
  this.props.register(newUser, this.props.navigation);
  };

  

  render(){
    
    const {errors} = this.state;
    const {isAuthenticated} = this.props.auth;
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }
     
  return (
     <div>
      <section className="container">
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form noValidate className="text-danger"onSubmit={this.onSubmit}>
        <TextFieldGroup
            placeholder="Name"
            name = "name"
            type="name"
            value={this.state.name}
            onChange= {this.onChange}
            error= {errors.name}            
            />
  
          <TextFieldGroup
            placeholder="Email Address"
            name = "email"
            type="email"
            value={this.state.email}
            onChange= {this.onChange}
            error= {errors.email} 
            info = " This site uses Gravatar so if you want a profile image, use a Gravatar email"           
            />
     
        
            <TextFieldGroup
            placeholder="Password"
            name = "password"
            type="password"
            value={this.state.password}
            onChange= {this.onChange}
            error= {errors.password}            
            />

          <TextFieldGroup
            placeholder="Confirm Password"
            name = "password2"
            type="password"
            value={this.state.password2}
            onChange= {this.onChange}
            error= {errors.password2}            
            />
          <input type="submit" className="btn btn-primary" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
     </p>
      </section>
    </div>
  );
}

};




Register.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { register }
)(withNavigateHook(Register));


