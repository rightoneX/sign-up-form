import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SignupForm from '../components/SignupForm';
import Const from '../Constants.js';

let formTitle, emailInput, passwordInput, cfrmPasswordInput, submitButton;
beforeEach(() => {
  render(<SignupForm />);

  formTitle = screen.getByText(Const.FORM_SIGN_UP_TITLE);
  emailInput = screen.getByPlaceholderText(Const.EMAIL_PLACEHOLDER);
  passwordInput = screen.getByPlaceholderText(Const.PASSWORD_PLACEHOLDER);
  cfrmPasswordInput = screen.getByPlaceholderText(Const.CONFIRM_PASSWORD_PLACEHOLDER);
  submitButton = screen.getByRole('button', { name: Const.CREATE_ACCOUNT_BUTTON });
});

afterEach(cleanup);

test('Initializes empty form', () => {
  expect(formTitle).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(cfrmPasswordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
})


test('fill up the form with incorrect entries', () => {
  const email = 'testexample.com'
  const password = 'pass'
  const cfrmPassword = 'pas'

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(cfrmPasswordInput, { target: { value: cfrmPassword } });

  expect(emailInput).toHaveValue(email);
  expect(passwordInput).toHaveValue(password);
  expect(cfrmPasswordInput).toHaveValue(cfrmPassword);

  fireEvent.click(submitButton);

  const emailError = screen.getByText(Const.EMAIL_ERROR);
  expect(emailError).toBeInTheDocument();

  const passwordError = screen.getByText(Const.PASSWORD_ERROR);
  expect(passwordError).toBeInTheDocument();

  const confirmPasswordError = screen.getByText(Const.CONFIRM_PASSWORD_ERROR);
  expect(confirmPasswordError).toBeInTheDocument();
})

test('happy path test', () => {
  const email = 'test@example.com'
  const password = 'Q!1'
  const cfrmPassword = 'Q!1'

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(cfrmPasswordInput, { target: { value: cfrmPassword } });

  expect(emailInput).toHaveValue(email);
  expect(passwordInput).toHaveValue(password);
  expect(cfrmPasswordInput).toHaveValue(cfrmPassword);

  fireEvent.click(submitButton);

  const error = document.getElementsByClassName('error');
  expect(error).toHaveLength(0);

  const successMessage = screen.getByText(Const.SUCCESS_MESSAGE)
  expect(successMessage).toBeInTheDocument();
})
