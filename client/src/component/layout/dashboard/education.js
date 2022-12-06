import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import withNavigateHook from '../auth/withNavigateHook';
import Moment from 'react-moment';
import {deleteEducation} from '../../../actions/profileActions';

class Education extends Component{
    onDeleteClick(id) {
        this.props.deleteEducation(id);
    }

    render(){
        const education = this.props.education.map(
            edu =>(
                <tr key={edu._id}>
                    <td>{edu.school}</td>
                    <td>{edu.degree
                    }</td>
                    <td>
                        <Moment format = "YYYY/MM/DD">{edu.from}</Moment> - {edu.to===null?('Present'):(<Moment format = "YYYY/MM/DD">{edu.to}</Moment>)}
                        </td>
                    <td><button onClick={this.onDeleteClick.bind(this, edu._id)}className="btn btn-danger"></button>Delete</td>
                </tr>
            )
        )
        return (
            <div>
                <h4 className="my-5">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                        </tr>
                        
                            {education}
                        
                    </thead>
                </table>


            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,

   
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
  });

export default connect(null,{deleteEducation})(Education); 