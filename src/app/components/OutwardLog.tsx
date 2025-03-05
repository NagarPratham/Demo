import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OutwardLog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<string>('ID');
  const [pdfId, setPdfId] = useState<string>('');
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [deleteId, setDeleteId] = useState<string>('');

  const navigate = useNavigate();

  // const handleSearch = () => {
  //   console.log(`Searching for ${searchQuery} by ${searchCriteria}`);
  // };

  const handleRefresh = () => {
    console.log('Refreshing data...');
  };

  const handleDownloadPdf = () => {
    console.log(`Downloading PDF with ID: ${pdfId}`);
  };

  const handleUpdatePdf = () => {
    console.log(`Updating PDF with ID: ${pdfId}`, selectedPdf);
  };

  const handleDeleteRow = () => {
    console.log(`Deleting row with ID: ${deleteId}`);
  };

  const handleExportExcel = () => {
    console.log('Exporting data as Excel...');
  };

  const handleUpdateAll = () => {
    console.log('Updating all rows...');
  };

  const handleSendMail = () => {
    console.log('Sending mail...');
  };

  const handleBackToMain = () => {
    navigate('/main');
  };

  return (
    <div className="min-h-screen max-w-full bg-gray-800 flex items-center justify-center">
      <div className="font-sans p-5 max-w-xl mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl mb-5 text-gray-800">Outward Log Management</h2>

        <div className="mb-5 p-5">
          <label className="block font-bold mb-2">Search By:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query"
            className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex mb-3">
            {['ID', 'Subject', 'From'].map((criteria) => (
              <label key={criteria} className="flex items-center mr-5">
                <input
                  type="radio"
                  value={criteria}
                  checked={searchCriteria === criteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  className="mr-2"
                />
                {criteria}
              </label>
            ))}
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200" onClick={handleRefresh}>
            Refresh
          </button>
        </div>

        <div className="mb-5 p-5">
          <h3 className="mb-2 text-lg font-semibold">Download/Update PDF</h3>
          <label className="block font-bold mb-2">Enter PDF ID:</label>
          <input
            type="text"
            value={pdfId}
            onChange={(e) => setPdfId(e.target.value)}
            placeholder="Enter PDF ID"
            className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setSelectedPdf(e.target.files ? e.target.files[0] : null)}
            className="mb-2 border border-gray-300 rounded p-2"
          />
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={handleDownloadPdf}>
              Download PDF
            </button>
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-200" onClick={handleUpdatePdf}>
              Update PDF
            </button>
          </div>
        </div>

        <div className="mb-5 p-5">
          <h3 className="mb-2 text-lg font-semibold">Delete Row / Export Data</h3>
          <label className="block font-bold mb-2">Enter ID to Delete:</label>
          <input
            type="text"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            placeholder="Enter ID"
            className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex space-x-2">
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200" onClick={handleDeleteRow}>
              Delete
            </button>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition duration-200" onClick={handleExportExcel}>
              Export as Excel
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-5 p-5 bg-white rounded-lg space-x-4">
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200" onClick={handleUpdateAll}>
            Click to Update All
          </button>
          <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-200" onClick={handleSendMail}>
            Click to Send Mail
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200" onClick={handleBackToMain}>
            Back to Main
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutwardLog;
