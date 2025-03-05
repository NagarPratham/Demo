import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Image from 'next/image';
import clgImg from '../../images/clg-bg.jpg';


interface User {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch the credentials from data.json
  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data.users); // Access the "users" array from the JSON file
        setIsLoading(false); // Data has been loaded, stop loading
      })
      .catch(error => {
        console.error('Error fetching login data:', error);
        setErrorMessage('Unable to load login credentials');
        setIsLoading(false); // Stop loading even if there was an error
      });
  }, []);

  const handleLogin = () => {
    // Ensure that users are loaded before attempting login
    if (!users) {
      setErrorMessage('User data not loaded yet. Please try again later.');
      return;
    }

    // Check if the entered username and password match any user in the users array
    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
      // Set username in local storage
      localStorage.setItem('username', username);
      // alert(`Welcome to In-Out Desk, ${username}!`);
      navigate('/main'); // Navigate to the main page on successful login
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
<div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${clgImg.src})`, // Use the image as the background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >      <div className="bg-[rgba(0,0,0,0.7)] p-10 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-2xl mb-5 text-white">Login to In-Out Desk</h2>

        {/* Username Input */}
        <div className="mb-5 text-left">
          <label className="block text-md font-medium text-white mb-2">Username</label>
          <input 
            type="text" 
            className="w-full p-2 border border-white  rounded-lg focus:border-blue-300 focus:outline-none text-sm" 
            placeholder="Enter username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        {/* Password Input */}
        <div className="mb-5 text-left">
          <label className="block text-md font-medium text-white mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border border-white rounded-lg focus:border-blue-300 focus:outline-none text-sm" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {/* Error Message */}
        {/* {errorMessage && <p className="text-red-500 text-sm mb-5">{errorMessage}</p>} */}

        {/* Login Button */}
        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
