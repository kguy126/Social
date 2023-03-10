import React from 'react';
import classnames from 'classnames';
import PropTypes from "prop-types";


const InputGroup = ({
    name,
    placeholder,
    value,
    icon,
    error,

    type,
    onChange,


}) => {
  return (
    <div className="input-group mb-3">
        <div className='input-group-prepend'>
            <span className='input-group-text'>
                <i className={icon}/>
            </span>
        </div>
    <input
    className = {classnames('form-control form-control-lg', {'is-invalid': error})}

      placeholder={placeholder}
      type = {type}
      name={name}
      value={value}
      onChange={onChange}
    />
   
    {error && (<div className = "is-invalid">{error}</div>)}
  </div>
  )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon:PropTypes.string,
    error:PropTypes.string,
    type: PropTypes.string,
    onChange:PropTypes.func.isRequired,

   
  };


InputGroup.defaultProps ={
    type: 'text'
}

export default InputGroup;