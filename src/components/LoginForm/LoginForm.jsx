import { useState } from 'react';

import *  as authService from '../../services/authService'
import './LoginForm.css';


const LoginForm = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    if (props.setMessage) {
      props.setMessage('');
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'email' ? value.toLowerCase() : value
    });
  };


  const handleSubmit = async e => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      email: formData.email.toLowerCase(),
    };

    try {
      await authService.login(submissionData);
      props.handleSignupOrLogin();
    } catch (err) {
      props.setMessage(err.message);
    }
  };


  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="text"
          autoComplete='off'
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <input
          type="password"
          autoComplete='off'
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>
      <div>
        <button className="glow-on-hover">Log In</button>
      </div>

    </form>
  );
};

export default LoginForm;
