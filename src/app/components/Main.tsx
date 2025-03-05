import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'next/image';
import Logo from '../../images/Logo.png';
import clgImg from '../../images/clg-bg.jpg';
import inrd from '../../images/Inward.png';
import ctrl from '../../images/control.png';
import outrd from '../../images/outward.png';
import Ex_inrd from '../../images/external-Inward.png';
import In_inrd from '../../images/internal-Inward.png';
import outLog from '../../images/outwardLog.png';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userSession');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen" style={{
      backgroundImage: `url(${clgImg.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Header */}
      <div className="bg-[rgba(0,0,0,0.7)] text-white p-5 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src={Logo} alt="test" className="h-14 w-14" />
          <h1 className="text-2xl font-bold">In-Out Desk</h1>
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">WELCOME: {username || 'Guest'}</h2>
          <button
            className="bg-red-500 p-2 rounded-lg hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex justify-center items-center flex-col'>
        <div>
          <h2 className='text-[32px] md:text-[64px] text-center font-bold mt-9 text-white' style={{ textShadow: '5px 5px 11px black' }}>
            Digital Letter Box For VCET
          </h2>
        </div>
        <div className="flex-grow p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Inward Upload */}
            <div
              className="bg-[#CDC2A5] p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-400 transition"
              onClick={() => handleNavigation('/inward-upload')}
            >
              <div className="flex items-center space-x-4">
                <Image src={inrd} alt="test" className="h-8 w-8" />
                <h2 className="text-xl font-semibold">Inward Upload</h2>
              </div>
            </div>

            {/* Outward Upload */}
            <div
              className="bg-[#CDC2A5] p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-400 transition"
              onClick={() => handleNavigation('/outward-upload')}
            >
              <div className="flex items-center space-x-4">
                <Image src={outrd} alt="test" className="h-8 w-8" />
                <h2 className="text-xl font-semibold">Outward Upload</h2>
              </div>
            </div>

            {/* Internal Inward Log */}
            <div
              className="bg-[#CDC2A5] p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-400 transition"
              onClick={() => handleNavigation('/Internal-Inward-Log')}
            >
              <div className="flex items-center space-x-4">
                <Image src={In_inrd} alt="test" className="h-8 w-8" />
                <h2 className="text-xl font-semibold">Internal Inward Log</h2>
              </div>
            </div>

            {/* External Inward Log */}
            <div
              className="bg-[#CDC2A5] p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-400 transition"
              onClick={() => handleNavigation('/External-Inward-Log')}
            >
              <div className="flex items-center space-x-4">
                <Image src={Ex_inrd} alt="test" className="h-8 w-8" />
                <h2 className="text-xl font-semibold">External Inward Log</h2>
              </div>
            </div>

            {/* Outward Log */}
            <div
              className="bg-[#CDC2A5] p-6 rounded-lg shadow-xl cursor-pointer hover:bg-gray-400 transition"
              onClick={() => handleNavigation('/Outward-Log')}
            >
              <div className="flex items-center space-x-4">
                <Image src={outLog} alt="test" className="h-8 w-8" />
                <h2 className="text-xl font-semibold">Outward Log</h2>
              </div>
            </div>

            {/* Admin Control */}
            <div
          className="bg-[#CDC2A5] p-6 rounded-lg shadow-xl cursor-pointer hover:bg-gray-400 transition"
          onClick={() => handleNavigation('/admin-controller')}
        >
          <div className="flex items-center space-x-4">
            <Image src={ctrl} alt="Admin Control" className="h-8 w-8" />
            <h2 className="text-xl font-semibold">Admin Control</h2>
          </div>
        </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} VCET. All rights reserved.</p>
        <div className="mt-2">
          <a href="https://linkedin.com" className="mx-2">LinkedIn</a>
          <a href="https://twitter.com" className="mx-2">Twitter</a>
          <a href="https://facebook.com" className="mx-2">Facebook</a>
        </div>
      </footer>
    </div>
  );
};

export default Main;