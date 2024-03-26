import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SignupForm from '../components/SignupForm';

afterEach(cleanup);

test('Initializes empty form', () => {
  render(<SignupForm />);

  expect(screen.getByText('Sign Up')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter Email Address')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
})

test('fill up the form with incorrect entries', () => {
  render(<SignupForm />);

  const email = 'testexample.com'
  const password = 'pass'
  const cfrmPassword = 'pas'

  const emailInput = screen.getByPlaceholderText('Enter Email Address');
  const passwordInput = screen.getByPlaceholderText('Password');
  const cfrmPasswordInput = screen.getByPlaceholderText('Confirm Password');
  const submitButton = screen.getByRole('button', { name: 'Create Account' });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(cfrmPasswordInput, { target: { value: cfrmPassword } });

  expect(emailInput).toHaveValue(email);
  expect(passwordInput).toHaveValue(password);
  expect(cfrmPasswordInput).toHaveValue(cfrmPassword);

  fireEvent.click(submitButton);

  const emailError = screen.getByText(/Please enter a valid email/i)
  expect(emailError).toBeInTheDocument();

  const passwordError = screen.getByText(/must have at least one capital letter, one numeric character, and one special character/i)
  expect(passwordError).toBeInTheDocument();

  const confirmPasswordError = screen.getByText(/Must be the same as the password/i)
  expect(confirmPasswordError).toBeInTheDocument();
})


test('happy path test', () => {
  render(<SignupForm />);

  const email = 'test@example.com'
  const password = 'Q!1'
  const cfrmPassword = 'Q!1'

  const emailInput = screen.getByPlaceholderText('Enter Email Address');
  const passwordInput = screen.getByPlaceholderText('Password');
  const cfrmPasswordInput = screen.getByPlaceholderText('Confirm Password');
  const submitButton = screen.getByRole('button', { name: 'Create Account' });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(cfrmPasswordInput, { target: { value: cfrmPassword } });

  expect(emailInput).toHaveValue(email);
  expect(passwordInput).toHaveValue(password);
  expect(cfrmPasswordInput).toHaveValue(cfrmPassword);

  fireEvent.click(submitButton);

  const error = document.getElementsByClassName('error');
  expect(error).toHaveLength(0);

  const successMessage = screen.getByText(/Thank you! You have successfully submitted./i)
  expect(successMessage).toBeInTheDocument();
})

