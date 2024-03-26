import React from 'react'
import './App.scss';
import SignupForm from './components/SignupForm'


const App = () => {
    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <SignupForm />
        </div>
    )
}

export default App