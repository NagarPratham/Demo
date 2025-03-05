import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import App from '../app/components/App';

// Ensure that the root element is available before creating the root
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Create a root
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
