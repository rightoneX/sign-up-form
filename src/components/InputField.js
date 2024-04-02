import React from 'react'
import classNames from 'classnames';
import Message from './Message';

const InputField = ({ value, name, placeholder, type, onChange, error }) => {
  return (
    <div className='entry-filed'>
      <input
        type={type}
        value={value}
        name={name}
        className={classNames('form-control', { 'error-input': error })}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <Message message={error} type='error'/>}
    </div>
  )
}
export default InputField
