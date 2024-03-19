import './App.css';
import { useState } from "react";
import { validateEmail } from './utilities/validateEmail';
import { validatePassword } from './utilities/validatePassword';

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [cfrmPasswordError, setCfrmPasswordError] = useState("");
    const [errorBox, setErrorBox] = useState(false);
    const [successBox, setSuccessBox] = useState(false);


    const clearForm = () => {
        setErrorBox(false);
        setSuccessBox(false);
        setEmailError("");
        setPasswordError("");
        setCfrmPasswordError("");
    }

    const onSubmit = (e) => {
        e.preventDefault();

        clearForm();

        let error = false;

        if (validateEmail(email) === null) {
            setEmailError("- Please enter a valid email");
            error = true;
        }

        if (validatePassword(password) === null) {
            setPasswordError("- Password must have at least one capital letter, one numeric character, and one special character");
            error = true;
        }

        if (password !== confirmPassword || password === "") {
            setCfrmPasswordError("- Confirmed Password must be the same as the password");
            error = true;
        }

        if (error) {
            setErrorBox(error);
        } else {
            setSuccessBox(!error);
        }
    }

    return (
        <>
            <div className="App">

                {errorBox && (
                    <div className='error-box'>
                        {emailError && <div className="message-txt email-error">{emailError}</div>}
                        {passwordError && <div className="message-txt password-error">{passwordError}</div>}
                        {cfrmPasswordError && <div className="message-txt cfrm-password-error">{cfrmPasswordError}</div>}
                    </div>
                )}

                {successBox && (
                    <div className='success-box'>
                        <div className="message-txt">Thank you!</div>
                    </div>
                )}

                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>

                <form onSubmit={onSubmit} data-testid="form">

                    <h2>Sign Up</h2>

                    <div className='entry-filed'>
                        <input
                            id="username"
                            name="email"
                            type="text"
                            // type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); }}
                            placeholder="Enter Email Address"
                            // required
                        />
                    </div>

                    <div className='entry-filed'>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); }}
                            placeholder="Password"
                           // required
                        />
                    </div>

                    <div className='entry-filed'>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value); }}
                            placeholder="Confirm Password"
                            // required
                        />
                    </div>

                    <button
                        id="submit"
                        type="submit">
                        Create Account
                    </button>

                    <div className="link">
                        <a href='/login' className="link-account">Already have account?</a>
                    </div>

                </form >

            </div >
        </>
    )
}

export default App; 