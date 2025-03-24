import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDownload, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

interface InwardItem {
    customId: string;
    inwardType: string;
    letterDate: string;
    receivedDate: string;
    subject: string;
    from: string;
    to: string;
    pages: number;
    file: string;
}

const InternalInwardLog: React.FC = () => {
    const [inwardData, setInwardData] = useState<InwardItem[]>([]);
    const [filteredData, setFilteredData] = useState<InwardItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [editData, setEditData] = useState<InwardItem | null>(null);
    const [searchId, setSearchId] = useState<string>('');

    useEffect(() => {
        const fetchInwardData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/inward');
                setInwardData(response.data);
                setFilteredData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch inward data');
                setLoading(false);
            }
        };
        fetchInwardData();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchId(value);
        setFilteredData(
            value ? inwardData.filter(item => item.customId.includes(value)) : inwardData
        );
    };

    const handleEdit = (item: InwardItem) => {
        setEditData({ ...item });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editData) {
            setEditData({ ...editData, [e.target.name]: e.target.value });
        }
    };

    const handleUpdate = async () => {
        if (editData) {
            try {
                await axios.put(`http://localhost:3000/api/inward/${editData.customId}`, editData);
                setInwardData(inwardData.map(item => (item.customId === editData.customId ? editData : item)));
                setFilteredData(filteredData.map(item => (item.customId === editData.customId ? editData : item)));
                setEditData(null);
            } catch (err) {
                alert('Failed to update entry');
            }
        }
    };

    const handleDownload = (file: string) => {
        window.open(file, '_blank');
    };

    const handleDelete = async (customId: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/inward/${customId}`);
            const updatedData = inwardData.filter(item => item.customId !== customId);
            setInwardData(updatedData);
            setFilteredData(updatedData);
            alert(`Deleted entry: ${customId}`);
        } catch (err) {
            alert('Failed to delete entry');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Internal Inward Log</h2>
                <input 
                    type="text" 
                    placeholder="Search by ID" 
                    value={searchId} 
                    onChange={handleSearch} 
                    className="mb-6 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {loading && <div className="text-gray-800 text-center">Loading data...</div>}
                {error && <div className="text-red-500 text-center">{error}</div>}
                
                {!loading && !error && filteredData.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-gray-800">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-3 border w-1/12">Custom ID</th>
                                    <th className="px-4 py-3 border w-1/6">Inward Type</th>
                                    <th className="px-4 py-3 border w-1/6">Letter Date</th>
                                    <th className="px-4 py-3 border w-1/6">Received Date</th>
                                    <th className="px-4 py-3 border w-1/4">Subject</th>
                                    <th className="px-4 py-3 border w-1/6">From</th>
                                    <th className="px-4 py-3 border w-1/6">To</th>
                                    <th className="px-4 py-3 border w-1/12">Pages</th>
                                    <th className="px-4 py-3 border w-1/12">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.customId} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 border text-center">{item.customId}</td>
                                        <td className="px-4 py-3 border text-center">{item.inwardType}</td>
                                        <td className="px-4 py-3 border text-center">{item.letterDate}</td>
                                        <td className="px-4 py-3 border text-center">{item.receivedDate}</td>
                                        <td className="px-4 py-3 border text-center">{item.subject}</td>
                                        <td className="px-4 py-3 border text-center">{item.from}</td>
                                        <td className="px-4 py-3 border text-center">{item.to}</td>
                                        <td className="px-4 py-3 border text-center">{item.pages}</td>
                                        <td className="px-4 py-3 border text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button 
                                                    onClick={() => handleEdit(item)} 
                                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                                >
                                                    <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDownload(item.file)} 
                                                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                                                >
                                                    <FontAwesomeIcon icon={faDownload} className="text-lg" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(item.customId)} 
                                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && !error && filteredData.length === 0 && <div className="text-gray-800 text-center">No inward data available</div>}

                {/* Edit Form */}
                {editData && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                        <h3 className="text-xl text-gray-800 mb-6">Edit Entry</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="inwardType" value={editData.inwardType} onChange={handleChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Inward Type" />
                            <input type="date" name="letterDate" value={editData.letterDate} onChange={handleChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="date" name="receivedDate" value={editData.receivedDate} onChange={handleChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <textarea name="subject" value={editData.subject} onChange={handleChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Subject" />
                            <input type="text" name="from" value={editData.from} onChange={handleChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="From" />
                            <input type="text" name="to" value={editData.to} onChange={handleChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="To" />
                            <input type="number" name="pages" value={editData.pages} onChange={handleChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Pages" />
                        </div>
                        <div className="flex justify-end mt-6 space-x-4">
                            <button 
                                onClick={handleUpdate} 
                                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200"
                            >
                                <FontAwesomeIcon icon={faSave} className="text-lg" />
                            </button>
                            <button 
                                onClick={() => setEditData(null)} 
                                className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200"
                            >
                                <FontAwesomeIcon icon={faTimes} className="text-lg" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InternalInwardLog;