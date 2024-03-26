import React from 'react'
import ErrorMessage from './ErrorMessage';
import classNames from 'classnames';


const InputField = ({ value, name, placeholder, type, onChange, errors }) => {
  return (
    <div className='entry-filed'>
      <input
        type={type}
        value={value}
        name={name}
        className={classNames('form-control', { 'error-input': errors })}
        placeholder={placeholder}
        onChange={onChange}
      />
      {errors ? <ErrorMessage message={errors} /> : null}
    </div>
  )
}
export default InputField
