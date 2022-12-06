const validator = require('validator');
const isEmpty = require ('./isempty');

module.exports = function validateProfileInput(data) {

    let errors = {};


    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';


    if(!validator.isLength(data.handle,{min:2, max:40})){
        errors.handle= 'Handle must be between 2 and 40 characters';

    }

    if(validator.isEmpty(data.handle)){
        errors.handle = 'Handle field is required';
    }

    if(validator.isEmpty(data.status)){
        errors.status = 'Status field is required';
    }

    if(validator.isEmpty(data.skills)){
        errors.skills = 'Skills field is required';
    }

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = 'Not valid';
        }}

        if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.website = 'Not valid';
        }} 

    return{
        errors,
        isValid:isEmpty(errors)}
    
}