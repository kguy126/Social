import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../../actions/profileActions';
import Spinner from "./spinner";
import {Link, Navigate} from 'react-router-dom';
import ProfileActions from "./profileActions";
import Experince from './experience';
import Education from './education';
class Dashboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile()
    }
    onDeleteClick(e){
        this.props.deleteAccount();
    }
  render() {

    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;
    const {isAuthenticated} = this.props.auth;
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    let dashboardContetnt;

    if(profile ===null|| loading){
            dashboardContetnt = <Spinner/>;
    }
    else {
       if(Object.keys(profile).length>0){
        dashboardContetnt = (
            <div>
                <p className='lead text-muted'>Welcome <Link to={`/profile/${profile.handle}`}>{user.name}
                </Link></p>
                <ProfileActions/>
                <Experince experience = {profile.experience}/>
                <Education education = {profile.education}/>
                {/**TODO: exp and edu */}
                <div style ={{ marginBottom: '60px'}}/>
                <button onClick={this.onDeleteClick.bind(this)} className = "btn btn-danger">Delete My Account</button>

            </div>
        );
       }
       else{
        //No profile
        dashboardContetnt=
        (<div>
        <p className='lead text-muted'>Welcome {user.name}</p>
        <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
          </div>);

       }
    }

    return (
      <div className= "dashboard">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {dashboardContetnt}

                </div>
            </div>
        </div>
        
      </div>
    )
  }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired, 
  };
  
  const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
   
  });
  


export default connect( mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
