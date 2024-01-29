import { useState } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import LoginForm from '../../components/LoginForm/LoginForm';


import './Landing.css'

const Landing = ({ handleSignupOrLogin }) => {
  const [message, setMessage] = useState('');
  const [currentForm, setcurrentForm] = useState('login'); // Tracks the current form

  return (
    <div className="landing-container">
      <div className="brand-container">
        <h1 className="brand-title">Style$tash</h1>
        <p className="brand-subtitle">Your wardrobe on the Go</p>
        <p className="brand-description">
          Welcome to StyleStash, the innovative app created by Array of Attire that revolutionizes your shopping and wardrobe management experience! Have you ever found yourself in a store, wondering if you already own something similar to what's in your hand? StyleStash is your modern solution to this age-old dilemma.
        </p>
      </div>
      {currentForm === 'login' ? (
        <LoginForm 
          message={message} 
          setMessage={setMessage}
          handleSignupOrLogin={handleSignupOrLogin}
        />
      ) : (
        <SignupForm 
          message={message} 
          setMessage={setMessage} 
          handleSignupOrLogin={handleSignupOrLogin}
        />
      )}
      <button onClick={() => setcurrentForm(currentForm === 'login' ? 'signup' : 'login')} className="toggle-button">
        {currentForm === 'login' ? 'Sign Up' : 'Log In'}
      </button>
    </div>
  );
};

export default Landing;
