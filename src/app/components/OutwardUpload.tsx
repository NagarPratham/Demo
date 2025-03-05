import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  to: string;
  address: string;
  from: string;
  subject: string;
  briefDescription: string;
  numberOfPages: string;
  remark: string;
  letterDate: string;
  relatedToInward: string;
  file: File | null;
}

const OutwardUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    to: '',
    address: '',
    from: '',
    subject: '',
    briefDescription: '',
    numberOfPages: '',
    remark: '',
    letterDate: new Date().toISOString().split('T')[0],
    relatedToInward: '',
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }
      setFormData((prevData) => ({ ...prevData, file: selectedFile }));
    }
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const response = await axios.post('http://localhost:3000/api/outwardUpload', formData);
      console.log('Data uploaded successfully:', response.data);
      alert('Data uploaded successfully!');
      navigate('/main');
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Failed to upload data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    console.log(formData)
  };

  const goBackToMain = () => {
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-300">
        <h2 className="text-center text-2xl font-semibold text-white mb-6">Outward Upload</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium">To:</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-white font-medium">From:</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-white font-medium">Brief Description:</label>
            <textarea
              name="briefDescription"
              value={formData.briefDescription}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 resize-y"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Number of Pages:</label>
            <input
              type="number"
              name="numberOfPages"
              value={formData.numberOfPages}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Remark:</label>
            <input
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Select Letter Date:</label>
            <input
              type="date"
              name="letterDate"
              value={formData.letterDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
                        <label className="block text-white font-medium mb-2">Upload PDF</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
           </div>
          <div className="md:col-span-1">
            <label className="block text-white font-medium">Is it Related to any INWARD?</label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="relatedToInward"
                value="yes"
                checked={formData.relatedToInward === 'yes'}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label className="mr-4 text-white">YES</label>
              <input
                type="radio"
                name="relatedToInward"
                value="no"
                checked={formData.relatedToInward === 'no'}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label className="text-white">NO</label>
            </div>
          </div>
          <div className="flex space-x-4 justify-center mt-6 md:col-span-2">
  <button
    type="submit"
    disabled={isSubmitting}
    className="bg-gray-500  text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
  >
    {isSubmitting ? 'Uploading...' : 'Upload'}
  </button>
  
  <button
    onClick={goBackToMain}
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
  >
    Go Back to Main
  </button>
</div>

        </form>
       
      </div>
    </div>
  );
};

export default OutwardUploadForm;
