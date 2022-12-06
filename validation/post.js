const validator = require('validator');
const isEmpty = require ('./isempty');

module.exports = function validatePostInput(data) {

    let errors = {};


    data.text = !isEmpty(data.text) ? data.text : '';


    if(!validator.isLength(data.text,{min:2, max:50})){
        errors.text = 'Post must be between 2 and 20 characters';

    }

    if(validator.isEmpty(data.text)){
        errors.text = 'Text field is required';
    }

 
   


    

    return{
        errors,
        isValid:isEmpty(errors)}
    
}