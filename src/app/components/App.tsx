import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './global.css';
import Login from './Login';
import Main from './Main';
import InwardUpload from './InwardUpload';
import OutwardUpload from './OutwardUpload';
import InternalInwardLog from './InternalInwardLog';
import ExternalInwardLog from './ExternalInwardLog';
import OutwardLog from './OutwardLog';
import AdminControl from './AdminControl';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/inward-upload" element={<InwardUpload />} />
        <Route path="/outward-upload" element={<OutwardUpload />} />
        <Route path="/internal-inward-log" element={<InternalInwardLog />} />
        <Route path="/external-inward-log" element={<ExternalInwardLog />} />
        <Route path="/outward-log" element={<OutwardLog />} />
        <Route path="/admin-control" element={<AdminControl />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
