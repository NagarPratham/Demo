// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// interface SidebarProps {
//   onNavigate: (path: string) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     sessionStorage.removeItem('userSession');
//     navigate('/');
//   };

//   return (
//     <div className="w-64 bg-gray-300 p-5 h-screen fixed">
//       {/* <img src={Logo.src} alt="Logo" className="block mx-auto mb-5 w-12 h-12" /> */}
//       <h2 className="text-lg mb-5">In-Out Desk</h2>
//       <ul className="list-none p-0">
//         <li
//           className="p-3 mb-2 bg-gray-200 cursor-pointer transition-colors duration-300 hover:bg-blue-200"
//           onClick={() => onNavigate('/inward-upload')}
//         >
//           Inward Upload
//         </li>
//         <li
//           className="p-3 mb-2 bg-gray-200 cursor-pointer transition-colors duration-300 hover:bg-blue-200"
//           onClick={() => onNavigate('/outward-upload')}
//         >
//           Outward Upload
//         </li>
//         <li
//           className="p-3 mb-2 bg-gray-200 cursor-pointer transition-colors duration-300 hover:bg-blue-200"
//           onClick={() => onNavigate('/Internal-Inward-Log')}
//         >
//           Internal Inward Log
//         </li>
//         <li
//           className="p-3 mb-2 bg-gray-200 cursor-pointer transition-colors duration-300 hover:bg-blue-200"
//           onClick={() => onNavigate('/External-Inward-Log')}
//         >
//           External Inward Log
//         </li>
//         <li
//           className="p-3 mb-2 bg-gray-200 cursor-pointer transition-colors duration-300 hover:bg-blue-200"
//           onClick={() => onNavigate('/Outward-Log')}
//         >
//           Outward Log
//         </li>
//         <li className="p-3 mb-2 bg-gray-200 cursor-pointer transition-colors duration-300 hover:bg-blue-200">
//           Admin Control
//         </li>
//         <li
//           className="p-3 mb-2 bg-red-500 text-white cursor-pointer transition-colors duration-300 hover:bg-red-600"
//           onClick={handleLogout}
//         >
//           LOGOUT
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
