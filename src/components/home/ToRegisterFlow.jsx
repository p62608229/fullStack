import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import '../../css/home.css';

export const ToRegisterFlow = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  // return (
  //   <div className="to-register-flow">
  //     <p>Register now and you can search for candidates or look for a job easily and conveniently!</p>
  //     <Button className="register-button" label="Register" onClick={handleRegisterClick} />
  //   </div>
  // );
}
