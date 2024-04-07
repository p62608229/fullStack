import { useNavigate, Outlet } from "react-router-dom";
import { Button } from 'primereact/button';

export const ToRegisterFlow = () => {
  const naviget = useNavigate()

  const buttonStyle = {
    backgroundColor: '#fe4a6b',
    color: 'white',
    border: 'none', // Remove border
    marginLeft: '10px', // Add space between text and button
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
    naviget('/register');
  };

  return (
    <div style={containerStyle}>
      <p>Register now and you can search for candidates or look for a job easily and conveniently!</p>
      <Button style={buttonStyle} label="Register" onClick={handleRegisterClick} />
    </div>
  );
}
