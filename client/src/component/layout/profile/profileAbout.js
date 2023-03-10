import React,{Component} from 'react';
import isEmpty from '../../../validation/isempty';


class ProfileAbout extends Component{
    render(){
        const {profile} = this.props;
        const firstName= profile.user.name.trim().split(' ')[0];

        const skills = profile.skills.map((skills,index)=>(
            <div key={index} className="p-3" >
                <i className="fa fa-check"/>{skills}
            </div>
        )) 

        return(
            <div className="row">
                <div className="card card-body bg-info mb-3">
                    <h3 className="text-center text-white">{firstName}'s Bio</h3>
                    <p className="lead">{isEmpty(profile.bio) ? (<span>{firstName} does not have a bio</span>) : (<span>{profile.bio}</span>)}
                       
                    </p>
                    <hr />
                        <h3 className="text-center text-white">Skill Set</h3>
                        <div class="row">
                            <div className="d-flex flex-wrap justify-content-center align-tems-center">
                            {skills}
                            </div>
                        </div>
                </div>

       
        
          </div>
  
        )
    }
}

export default ProfileAbout;