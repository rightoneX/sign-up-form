import React from 'react'
import ErrorMessage from './ErrorMessage';

const InputField = ({ value, label, name, placeholder, type, onChange, errors }) => (
  <div className='entry-filed'>
    {label && <label htmlFor="input-field">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className={errors ? "form-control error-input" : "form-control"}
      placeholder={placeholder}
      onChange={onChange}
    />
    {errors ? <ErrorMessage message={errors} /> : null}
  </div>
);
export default InputField