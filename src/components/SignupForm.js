import React from 'react'
import { useState } from "react";
import { validationPassword, validationEmail } from '../utilities/inputValidation.js';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import Const from '../Constants.js';
import Message from './Message.js';


const fields = [
  { name: 'email', type: 'text', placeholder: Const.EMAIL_PLACEHOLDER },
  { name: 'password', type: 'password', placeholder: Const.PASSWORD_PLACEHOLDER },
  { name: 'confirmPassword', type: 'password', placeholder: Const.CONFIRM_PASSWORD_PLACEHOLDER },
];

function SignupForm() {
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newError = {};

    if (!validationEmail(inputs.email)) {
      newError.email = Const.EMAIL_ERROR;
      isValid = false;
    }

    if (!validationPassword(inputs.password)) {
      newError.password = Const.PASSWORD_ERROR;
      isValid = false;
    }

    if (inputs.confirmPassword === '' || inputs.password !== inputs.confirmPassword) {
      newError.confirmPassword = Const.CONFIRM_PASSWORD_ERROR;
      isValid = false;
    }

    setError(newError);
    return isValid;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      console.log("Form data:", inputs);
    }
  };

  return (
    <>
      {submitted && (
        <Message
          message={Const.SUCCESS_MESSAGE}
          type='success'
        />
      )}

      <form onSubmit={handleSubmit} data-testid="form">
        <h2>{Const.FORM_SIGN_UP_TITLE}</h2>

        {fields.map((item, index) => (
          <InputField
            key={index}
            type={item.type}
            name={item.name}
            value={inputs[item.name]}
            placeholder={item.placeholder}
            onChange={handleInputChange}
            error={error[item.name]}
          />
        ))}

        <SubmitButton
          type="submit"
          label={Const.CREATE_ACCOUNT_BUTTON}
        />

      </form >
    </>
  )
}

export default SignupForm