import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import TextFieldGroup from "../common/textFieldGroup";
import withNavigateHook from "../auth/withNavigateHook";
import { addExperience } from "../../../actions/profileActions";


class AddExperience extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentWillReceiveProps(nextProps) {
     
       
    
        if (nextProps.errors) {
          if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
          }
        }
      }

      onSubmit(e) {
        e.preventDefault();
    const expData = {
    
        company: this.state.company,
        title: this.state.title,
        location: this.state.location,
        from: this.state.from,
        to:this.state.to,
        current: this.state.current,
        description: this.state.description
    
       
        
    };
    this.props.addExperience(expData, this.props.navigation);
      }
    
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e){
    this.setState({
        disabled: !this.state.disabled,
        current: !this.state.current
    });
  }


    render(){

        const { errors } = this.state;
        const {isAuthenticated} = this.props.auth;
        if (!isAuthenticated) {
          return <Navigate to="/" />;
        }

        return(
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                           <Link to ="/dashboard" className="btn btn-light">
                            Go Back
                           </Link>
                           <h1 className="display-4 text-center text-white"> Add Experience</h1>
                           <p className="lead text-center text-white"> Add any job or position that you have had in the past or current</p>
                           <small className="d-block pb3 text-white"> * =required fields</small>

                            <form className="text-danger"onSubmit={this.onSubmit}>

                            <TextFieldGroup
                                placeholder="* Company"
                                name = "company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error = {errors.company}
                                />

                            <TextFieldGroup
                                placeholder="* Job Title"
                                name = "title"
                                value={this.state.title}
                                onChange={this.onChange}
                                error = {errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name = "location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error = {errors.location}
                                    />

                                <h6 className="text-white">From Date</h6>  
                                <TextFieldGroup
                                name = "from"
                                type = "date"
                                value={this.state.from}
                                onChange={this.onChange}
                                error = {errors.from}
                                />  
                                <h6 className="text-white">To Date</h6>  
                                <TextFieldGroup
                                name = "to"
                                type = "date"
                                value={this.state.to}
                                onChange={this.onChange}
                                error = {errors.to}
                                disabled = {this.state.disabled?'disabled':''}
                                />  

                                <div className="form-check mb-4">
                                <input 
                                type = "checkbox"
                                className="form-check-input"
                                name = "current"
                                value = {this.state.current}
                                checked = {this.state.current}
                                onChange = {this.onCheck}
                                id = "current"
                                />   
                                 <label htmlFor="current" className="form-check-label text-white" >Current Job</label>
                                </div>
                            <TextAreaFieldGroup
                            placeholder="Job Description"
                            name = "description"
                            value={this.state.description}
                            onChange={this.onChange}
                            error = {errors.description}
                            info = "Tell us about your position "
                            /> 
                            <input type = "submit" value ="Submit" className="btn btn-info btn-block mt 4"/>  
                               
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        )

    }
}


AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
   
  };
  
  const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors,
  });
  
  
  
  export default connect(mapStateToProps,{addExperience} )(withNavigateHook(AddExperience));
  