import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InwardUpload: React.FC = () => {
    const [inwardType, setInwardType] = useState<string>('Internal');
    const [letterDate, setLetterDate] = useState<string>('');
    const [receivedDate, setReceivedDate] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [briefDescription, setBriefDescription] = useState<string>('');
    const [descriptionLanguage, setDescriptionLanguage] = useState<string>('English');
    const [numberOfPages, setNumberOfPages] = useState<string>('');
    const [remark, setRemark] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const navigate = useNavigate();

   
 const handleUpload = async () => {
        if (!file || !inwardType || !letterDate || !receivedDate || !subject || !from || !to || !numberOfPages) {
            alert('Please fill out all required fields and upload a PDF file');
            return;
        }
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64File = reader.result; // Convert to Base64
    
            const data = {
                inwardType,
                letterDate,
                receivedDate,
                subject,
                from,
                to,
                address,
                description: briefDescription,
                language: descriptionLanguage,
                pages: numberOfPages,
                remark,
                file: base64File, // Send file as Base64 string
            };
    
            try {
                setIsSubmitting(true);
                const response = await axios.post('http://localhost:3000/api/inward', data);
                console.log('Data uploaded successfully:', response.data);
                alert('Data uploaded successfully!');
                navigate('/main');
            } catch (error) {
                console.error('Error uploading data:', error);
                alert('Failed to upload data. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        };
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type !== 'application/pdf') {
                alert('Please upload a PDF file');
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDescriptionLanguage(e.target.value);
    };

    const goBackToMain = () => {
        navigate('/main');
    };

    const isFormValid = () => {
        return file && inwardType && letterDate && receivedDate && subject && from && to && numberOfPages;
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-white mb-8">Inward Upload</h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Inward Type Selection */}
                    <div className="form-group">
                        <label className="block text-lg font-medium text-white mb-2">Select Inward Type:</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Internal"
                                    checked={inwardType === 'Internal'}
                                    onChange={(e) => setInwardType(e.target.value)} 
                                    className="mr-2"
                                    required
                                />
                                <span className="text-white">Internal</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="External"
                                    checked={inwardType === 'External'}
                                    onChange={(e) => setInwardType(e.target.value)}
                                    className="mr-2"
                                    required
                                />
                                <span className="text-white">External</span>
                            </label>
                        </div>
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

                    {/* Form Fields */}
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">Select Letter Date:</label>
                        <input
                            type="date"
                            value={letterDate}
                            onChange={(e) => setLetterDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">Select Received Date:</label>
                        <input
                            type="date"
                            value={receivedDate}
                            onChange={(e) => setReceivedDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">Subject:</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">From:</label>
                        <input
                            type="text"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">To:</label>
                        <input
                            type="text"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">Brief Description:</label>
                        <input
                            type="text"
                            value={briefDescription}
                            onChange={(e) => setBriefDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">Select Language:</label>
                        <select
                            value={descriptionLanguage}
                            onChange={handleLanguageChange}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">Number of Pages:</label>
                        <input
                            type="number"
                            value={numberOfPages}
                            onChange={(e) => setNumberOfPages(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block font-medium text-white mb-2">Remark:</label>
                        <textarea
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </form>

                {/* Buttons */}
                <div className="flex space-x-4 justify-center mt-6">
                    <button
                        onClick={handleUpload}
                        className={`bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isFormValid() || isSubmitting}
                    >
                        {isSubmitting ? 'Uploading...' : 'Upload'}
                    </button>
                    <button
                        onClick={goBackToMain}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InwardUpload;
