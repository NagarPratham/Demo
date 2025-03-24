import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUpload, FaArrowLeft } from 'react-icons/fa';

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
            const base64File = reader.result;

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
                file: base64File,
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

    // Dynamic styles
    const formHeaderStyle = {
        backgroundColor: inwardType === 'External' ? '#1E293B' : '#3B82F6',
        color: '#FFFFFF',
    };

    const buttonStyle = {
        backgroundColor: inwardType === 'External' ? '#EF4444' : '#3B82F6',
        color: '#FFFFFF',
    };

    const backButtonStyle = {
        backgroundColor: inwardType === 'External' ? '#F59E0B' : '#64748B',
        color: inwardType === 'External' ? '#000000' : '#FFFFFF',
    };

    return (
        <div className="fixed inset-0 bg-gray-100 flex flex-col">
            {/* Header */}
            <div 
                className="w-full py-4 px-6 shadow-md transition-colors duration-300"
                style={formHeaderStyle}
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Inward Document Upload</h1>
                    <button
                        onClick={goBackToMain}
                        style={backButtonStyle}
                        className="px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Main
                    </button>
                </div>
            </div>

            {/* Main Form */}
            <div className="flex-1 overflow-hidden p-4">
                <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-black">Document Details</h2>
                        
                        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                            {/* Inward Type */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black">Inward Type*</label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2 text-black">
                                        <input
                                            type="radio"
                                            value="Internal"
                                            checked={inwardType === 'Internal'}
                                            onChange={(e) => setInwardType(e.target.value)}
                                            className="form-radio h-5 w-5 text-blue-500"
                                            required
                                        />
                                        <span>Internal</span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-black">
                                        <input
                                            type="radio"
                                            value="External"
                                            checked={inwardType === 'External'}
                                            onChange={(e) => setInwardType(e.target.value)}
                                            className="form-radio h-5 w-5 text-blue-500"
                                            required
                                        />
                                        <span>External</span>
                                    </label>
                                </div>
                            </div>

                            {/* Document Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Letter Date*</label>
                                    <input
                                        type="date"
                                        value={letterDate}
                                        onChange={(e) => setLetterDate(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Received Date*</label>
                                    <input
                                        type="date"
                                        value={receivedDate}
                                        onChange={(e) => setReceivedDate(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black">Subject*</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                    required
                                />
                            </div>

                            {/* From/To */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">From*</label>
                                    <input
                                        type="text"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">To*</label>
                                    <input
                                        type="text"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-black">Additional Information</h2>
                        
                        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black">Document File (PDF)*</label>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FaUpload className="w-8 h-8 mb-3 text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PDF only (MAX. 10MB)</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="application/pdf" 
                                        onChange={handleFileChange} 
                                    />
                                </label>
                                {file && (
                                    <p className="mt-1 text-sm text-green-600">
                                        Selected: {file.name}
                                    </p>
                                )}
                            </div>

                            {/* Brief Description */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black">Brief Description</label>
                                <textarea
                                    value={briefDescription}
                                    onChange={(e) => setBriefDescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                    rows={3}
                                />
                            </div>

                            {/* Language and Pages */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Language</label>
                                    <select
                                        value={descriptionLanguage}
                                        onChange={handleLanguageChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                    >
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Number of Pages*</label>
                                    <input
                                        type="number"
                                        value={numberOfPages}
                                        onChange={(e) => setNumberOfPages(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remark */}
                            <div>
                                <label className="block text-sm font-medium mb-1 text-black">Remark</label>
                                <textarea
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleUpload}
                                style={buttonStyle}
                                className={`px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={!isFormValid() || isSubmitting}
                            >
                                <FaUpload className="mr-2" />
                                {isSubmitting ? 'Uploading...' : 'Upload Document'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InwardUpload;