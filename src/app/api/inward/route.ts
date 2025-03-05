import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Inward from '../../models/Inward'; // Adjust the path if needed
import multer from 'multer';

// Connect to MongoDB
const connectToDatabase = async () => {
    if (mongoose.connection.readyState !== 1) {
        try {
            await mongoose.connect('mongodb://localhost:27017/In-Out-Desk'); // Update connection string if needed
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('MongoDB connection error:', error);
        }
    }
};

// Setup multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to generate a custom ID
const generateCustomId = async () => {
    try {
        const currentYear = new Date().getFullYear().toString().slice(-2); // Get last two digits of the year
        const lastEntry = await Inward.findOne().sort({ customId: -1 }); // Get last inserted entry
        let serialNumber = '0001';

        if (lastEntry && lastEntry.customId && lastEntry.customId.startsWith(currentYear)) {
            const lastSerial = parseInt(lastEntry.customId.slice(2), 10);
            serialNumber = String(lastSerial + 1).padStart(4, '0');
        }

        return `${currentYear}${serialNumber}`;
    } catch (error) {
        console.error('Error generating custom ID:', error);
        throw new Error('Failed to generate custom ID');
    }
};

// POST method handler
export async function POST(req: Request) {
    await connectToDatabase();

    try {
        if (!req.headers.get('content-type')?.includes('application/json')) {
            return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
        }
        
        const data = await req.json();
        console.log('Received Data:', data); // Debugging log

        const requiredFields = ['inwardType', 'letterDate', 'receivedDate', 'subject', 'from', 'to', 'pages', 'file'];
        for (const field of requiredFields) {
            if (!data[field]) {
                console.error(`Missing field: ${field}`);
                return NextResponse.json({ error: `${field} is required` }, { status: 400 });
            }
        }

        console.log('Generating custom ID...');
        const customId = await generateCustomId();

        console.log('Saving to MongoDB...');
        const inwardData = new Inward({
            customId,
            inwardType: data.inwardType,
            letterDate: data.letterDate,
            receivedDate: data.receivedDate,
            subject: data.subject,
            from: data.from,
            to: data.to,
            address: data.address || '',
            description: data.description || '',
            language: data.language || 'English',
            pages: Number(data.pages),
            remark: data.remark || '',
            file: data.file || '', // Ensure file is handled properly
        });

        await inwardData.save();
        console.log('Data saved successfully');

        return NextResponse.json({ message: 'Inward data saved successfully', customId }, { status: 201 });
    } catch (error) {
        console.error('Error saving inward data:', error);
        return NextResponse.json({ error: 'Failed to save inward data', details: error }, { status: 500 });
    }
}

// GET method handler
export async function GET(request: Request) {
    await connectToDatabase();

    try {
        console.log('Fetching inward records...');
        const inwards = await Inward.find({});
        console.log('Fetched records:', inwards.length);

        return NextResponse.json(inwards, { status: 200 });
    } catch (error) {
        console.error('Error fetching inward data:', error);
        return NextResponse.json({ error: 'Failed to fetch inward data' }, { status: 500 });
    }
}
