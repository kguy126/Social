import React,{Component} from 'react';
import isEmpty from '../../../validation/isempty';
import PropTypes from 'prop-types';

class ProfileTop extends Component{
    render(){
        const { profile }= this.props;
        
        return(
            <div className = "row">
            <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                    <div className="col-4 col-md-3 m-auto">
                    <img
                    className="round-img my-1"
                    src={profile.user.avatar}
                    alt=""
                />
                    </div>
                </div>
                <div className="text-center">
                <h1 className="display-4 text-center">{profile.user.name}</h1>
                <p className="lead text-center">{profile.status} {isEmpty(profile.company)?null: (<span>at {profile.company}</span>)}</p>
                <p>{isEmpty(profile.location)?null: (<span>at {profile.location}</span>)}</p>
                <p>
                <div className="icons my-1">
                {isEmpty(profile.website)?null: (<a className="text-white p-2" href={profile.website} target="_blank"><i className="fas fa-globe fa-2x"/></a>)}
                    {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                </div>
                   
                  
                </p>

                </div>
                
              
                
                    
                </div>
                </div>
                        
                    </div>
        )
    }
}

ProfileTop.propTypes ={
  
    profile: PropTypes.object.isRequired,
  
}



export default ProfileTop;