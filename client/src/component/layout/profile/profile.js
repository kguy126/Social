import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link ,useParams} from 'react-router-dom';
import ProfileTop from './profileHeader';
import Profilecr from './profilecr';
import ProfileAbout from './profileAbout';
import Spinner from '../dashboard/spinner';
import {getProfileByHandle} from '../../../actions/profileActions';


const Profile = ({ getProfileByHandle, profile: { profile }, auth }) => {
    const { id } = useParams();
    useEffect(() => {
      getProfileByHandle(id);
    }, [getProfileByHandle, id]);


  
    return (
        <section className="container">
          {profile === null ? (
            <Spinner />
          ) : (
            <div>
          <div className="row">
            <div className="col-md-6">
                <Link to ="/profiles" className="btn btn-light mb 3 float-left">
                    Back to Profiles
                </Link>

            </div>
            <div className = "col-md-6"/>
          </div>
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile}/>
          <Profilecr education = {profile.education} experience={profile.experience}/>
            </div>
          )}
        </section>
      );
    };
    




Profile.propTypes ={
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    
}

const mapStateToProps = state =>({
    profile: state.profile,

})



export default connect(mapStateToProps, {getProfileByHandle}) (Profile);