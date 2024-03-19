import { render, screen, fireEvent,  cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('Initializes empty form', () => {
  render(<App />);

  expect(screen.getByText('Sign Up')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter Email Address')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  expect(screen.getByText('Already have account?')).toBeInTheDocument();
})

test('fill up the form', () => {
  render(<App />);
  
  // const email = 'test@example.com'
  const email = 'testexample.com'
  // const password = 'Q!1' 
  const password = 'pass' 
  // const cfrmPassword = 'Q!1'
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

  const emailError = document.getElementsByClassName('email-error');
  expect(emailError.item(0).textContent).toEqual('- Please enter a valid email');

  const passwordError = document.getElementsByClassName('password-error');
  expect(passwordError.item(0).textContent).toEqual('- Password must have at least one capital letter, one numeric character, and one special character');

  const crfmPasswordError = document.getElementsByClassName('cfrm-password-error');
  expect(crfmPasswordError.item(0).textContent).toEqual('- Confirmed Password must be the same as the password');

})

