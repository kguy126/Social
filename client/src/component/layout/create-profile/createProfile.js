import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/textAreaFieldGroup';
import InputGroup from '../common/inputGroup';
import SelectListGroup from '../common/selectListGroup';
import { Navigate } from "react-router-dom";
import { createProfile } from '../../../actions/profileActions';
import withNavigateHook from '../auth/withNavigateHook';

 class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',

            bio: '',

            linkedin: '',
            errors: {}
       

        }
        
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
        const profileData = {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,

        bio:this.state.bio,

        linkedin: this.state.linkedin
        }
        this.props.createProfile(profileData, this.props.navigation);
      }
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

  render() {
    const {errors, displaySocialInputs} = this.state;

    let socialInputs;

    if(displaySocialInputs) {
        socialInputs =(<div>
            <InputGroup
             placeholder="linkedin channel URL"
             name = "linkedin"
             icon= "fab fa-linkedin"
             value={this.state.linkedin}
             onChange={this.onChange}
             error={errors.linkedin}
            
            />
        </div>)
    }
    const {isAuthenticated} = this.props.auth;
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

const options = [
    {label: '*Select which represents you best', value : 0},
    {label: 'Editor', value : 'Editor'},{label: 'Author', value : 'Author'},
    {label: 'Freelance', value : 'Freelance'},
    {label: 'Hobby', value : 'Hobby'}

];

    return (
      <div className='create-profile'>
        <div className='container'>
            <div className='row'>
            <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'> Create Your Profile</h1>
                
                <p className='lead text-center'> Let's get some information to make your profile stand out</p>

                <small className = "d block pb-3"> * = required fields</small>
                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                    placeholder="* Profile Handle"
                    name = "handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error = {errors.handle}
                    info = "handle"
                    />

                    <SelectListGroup
                        placeholder="Status"
                        name = "status"
                        value={this.state.status}
                        onChange={this.onChange}
                        options={options}
                        error = {errors.status}
                        info = "IDEA BOY!!"
                        />

                    <TextFieldGroup
                    placeholder="Company"
                    name = "company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error = {errors.company}
                    info = "Affiliated with any company?"
                    />

                    <TextFieldGroup
                    placeholder="website"
                    name = "website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error = {errors.website}
                    info = "Affiliated with any website we can look at?"
                    />

                    <TextFieldGroup
                    placeholder="Location"
                    name = "location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error = {errors.location}
                    info = "Affiliated with any Location?"
                    />
                    <TextFieldGroup
                    placeholder="Skills"
                    name = "skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error = {errors.skills}
                    info = "Comma seperated values please!"
                    />

                    <TextAreaFieldGroup
                        placeholder="Short Bio"
                        name = "bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error = {errors.bio}
                        info = "Display, your writing skills, tell us about yourself "
                        />   

                    <div className='mb-3'>
                        <button type='button' onClick = {() => {
                            this.setState(
                                prevState=>({
                                    displaySocialInputs: !prevState.displaySocialInputs
                                })
                            )
                        }} className="btn btn-light">
                            Add Social Network Links
                            

                        </button>
                        <span className="text-muted">Optional</span>
                        
                        </div>    
                        {socialInputs}
                        <input type = "submit" value ="Submit" className ="btn btn-info btn-block mt-4"/>


                </form>

            </div>

            </div>

        </div>
        
      </div>
    )
  }
}
CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
   
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors,
  });
  
  
export default connect(mapStateToProps,{createProfile})(withNavigateHook(CreateProfile));