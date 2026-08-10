import { useState } from "react";
import axios from 'axios';

function Register() {
    const[name, setName] = useState<string>('');
    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    
    const handleRegister = async() => {
        try {
            const userData = {
                name,
                email,
                password
            };
            const url = 'https://manlygrip-us.backendless.app/api/users/register';
            const response = await axios.post(url, userData);
            console.log('User registered successfully:', response.data);
        } catch (error) {
            console.error('Error occurred while registering user:', error);
        }
    };
  return (
    <div>
      <h1>Register Page</h1>

      <div>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;