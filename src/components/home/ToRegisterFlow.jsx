import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';

export const ToRegisterFlow = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    backgroundColor: '#fe4a6b',
    color: 'white',
    border: 'none', // Remove border
    marginLeft: '10px', // Add space between text and button
    transition: 'background-color 0.3s ease', // Smooth transition effect
    '&:hover': {
      backgroundColor: 'red', // Darken the color on hover
    }
  };

  const containerStyle = {
    backgroundColor: '#443f3f',
    color: 'white',
    padding: '20px',
    display: 'flex', // Use flex to align items horizontally
    alignItems: 'center', // Center-align items vertically
    justifyContent: 'center', // Center-align items horizontally
    textAlign: 'center',
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div style={containerStyle}>
      <p>Register now and you can search for candidates or look for a job easily and conveniently!</p>
      <Button style={buttonStyle} label="Register" onClick={handleRegisterClick} />
    </div>
  );
}
