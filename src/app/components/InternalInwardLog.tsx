import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div className="min-h-screen bg-white p-4">
            <div className="max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-white mb-8">Internal Inward Log</h2>
                <input 
                    type="text" 
                    placeholder="Search by ID" 
                    value={searchId} 
                    onChange={handleSearch} 
                    className="mb-4 px-4 py-2 w-full border rounded"
                />
                {loading && <div className="text-white text-center">Loading data...</div>}
                {error && <div className="text-red-500 text-center">{error}</div>}
                
                {!loading && !error && filteredData.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Custom ID</th>
                                    <th className="px-4 py-2 border">Inward Type</th>
                                    <th className="px-4 py-2 border">Letter Date</th>
                                    <th className="px-4 py-2 border">Received Date</th>
                                    <th className="px-4 py-2 border">Subject</th>
                                    <th className="px-4 py-2 border">From</th>
                                    <th className="px-4 py-2 border">To</th>
                                    <th className="px-4 py-2 border">Pages</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.customId}>
                                        <td className="px-4 py-2 border">{item.customId}</td>
                                        <td className="px-4 py-2 border">{item.inwardType}</td>
                                        <td className="px-4 py-2 border">{item.letterDate}</td>
                                        <td className="px-4 py-2 border">{item.receivedDate}</td>
                                        <td className="px-4 py-2 border">{item.subject}</td>
                                        <td className="px-4 py-2 border">{item.from}</td>
                                        <td className="px-4 py-2 border">{item.to}</td>
                                        <td className="px-4 py-2 border">{item.pages}</td>
                                        <td className="px-4 py-2 border">
                                            <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-4 py-1 rounded">Edit</button>
                                            <button onClick={() => handleDownload(item.file)} className="bg-yellow-500 text-white px-4 py-1 rounded ml-2">Download PDF</button>
                                            <button onClick={() => handleDelete(item.customId)} className="bg-red-500 text-white px-4 py-1 rounded ml-2">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && !error && filteredData.length === 0 && <div className="text-white text-center">No inward data available</div>}

                {/* Edit Form */}
                {editData && (
                    <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                        <h3 className="text-xl text-white mb-4">Edit Entry</h3>
                        <input type="text" name="inwardType" value={editData.inwardType} onChange={handleChange} className="mb-2 px-4 py-2 w-full border rounded" />
                        <input type="date" name="letterDate" value={editData.letterDate} onChange={handleChange} className="mb-2 px-4 py-2 w-full border rounded" />
                        <input type="date" name="receivedDate" value={editData.receivedDate} onChange={handleChange} className="mb-2 px-4 py-2 w-full border rounded" />
                        <textarea name="subject" value={editData.subject} onChange={handleChange} className="mb-2 px-4 py-2 w-full border rounded"></textarea>
                        <input type="text" name="from" value={editData.from} onChange={handleChange} className="mb-2 px-4 py-2 w-full border rounded" />
                        <input type="text" name="to" value={editData.to} onChange={handleChange} className="mb-2 px-4 py-2 w-full border rounded" />
                        <input type="number" name="pages" value={editData.pages} onChange={handleChange} className="mb-2 px-4 py-2 w-full border rounded" />
                        <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
                        <button onClick={() => setEditData(null)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InternalInwardLog;
