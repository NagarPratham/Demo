import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(data => {
        setUsers(data.users);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Unable to load credentials');
        setIsLoading(false);
      });
  }, []);

  const handleLogin = () => {
    if (!users) {
      setErrorMessage('User data not loaded');
      return;
    }

    const validUser = users.find(user => user.username === username && user.password === password);
    validUser ? navigate('/main') : setErrorMessage('Invalid credentials');
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div 
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${clgImg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-[rgba(0,0,0,0.85)] p-10 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-2xl mb-5 text-white/90">Login to In-Out Desk</h2>
        
        <div className="mb-5 text-left">
          <label className="block text-white/90 font-medium mb-2">Username</label>
          <input 
            type="text" 
            className="w-full p-2 border border-white/50 rounded-lg bg-transparent text-white/90 focus:border-blue-300 focus:outline-none" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div className="mb-5 text-left">
          <label className="block text-white/90 font-medium mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border border-white/50 rounded-lg bg-transparent text-white/90 focus:border-blue-300 focus:outline-none" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {errorMessage && <p className="text-red-400 text-sm mb-5">{errorMessage}</p>}

        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-500/90 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;