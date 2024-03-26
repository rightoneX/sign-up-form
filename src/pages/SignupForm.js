import React from 'react'
import '../App.scss';
import { useState } from "react";
import { validationPassword, validationEmail } from '../utilities/inputValidation.js';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import Const from '../Constants.js';

function SignupForm() {
  const [errors, setErrors] = useState({});
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
    const newErrors = {};

    if (!validationEmail(inputs.email)) {
      newErrors.email = Const.EMAIL_ERROR;
      isValid = false;
    }

    if (!validationPassword(inputs.password)) {
      newErrors.password = Const.PASSWORD_ERROR;
      isValid = false;
    }

    if (inputs.confirmPassword === '' || inputs.password !== inputs.confirmPassword) {
      newErrors.confirmPassword = Const.CONFIRM_PASSWORD_ERROR;
      isValid = false;
    }

    setErrors(newErrors);
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
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      {submitted && (<div className="success">{Const.SUCCESS_MESSAGE}</div>)}

      <form onSubmit={handleSubmit} data-testid="form">

        <h2>{Const.FORM_SIGN_UP_TITLE}</h2>

        <InputField
          type="text"
          name="email"
          value={inputs.email}
          placeholder={Const.EMAIL_PLACEHOLDER}
          onChange={handleInputChange}
          errors={errors.email}
        />

        <InputField
          type="password"
          name="password"
          value={inputs.password}
          placeholder={Const.PASSWORD_PLACEHOLDER}
          onChange={handleInputChange}
          errors={errors.password}
        />

        <InputField
          type="password"
          name="confirmPassword"
          value={inputs.confirmPassword}
          placeholder={Const.CONFIRM_PASSWORD_PLACEHOLDER}
          onChange={handleInputChange}
          errors={errors.confirmPassword}
        />

        <SubmitButton
          type="submit"
          label={Const.CREATE_ACCOUNT_BUTTON}
        />

      </form >

    </div >
  )
}

export default SignupForm