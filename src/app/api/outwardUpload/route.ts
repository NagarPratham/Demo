import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Outward from '../../models/Outward'; // Adjust the path as necessary

// Connect to MongoDB
const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return; // Already connected
    }
    await mongoose.connect('mongodb://localhost:27017/In-Out-Desk'); // Use your MongoDB connection string
};

// Define the POST handler
export async function POST(request: Request) {
    await connectToDatabase();

    try {
        const data = await request.json(); // Parse JSON data from request

        // Create a new Outward document
        const outwardData = new Outward({
            to: data.to,
            address: data.address,
            from: data.from,
            subject: data.subject,
            briefDescription: data.briefDescription,
            numberOfPages: data.numberOfPages,
            remark: data.remark || '', // Provide a default value if remark is not provided
            letterDate: data.letterDate,
            relatedToInward: data.relatedToInward,
            pdfPath: data.pdfPath || '',
        });
        

        // Save to database
        await outwardData.save();

        return NextResponse.json({ message: 'Outward data saved successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error saving outward data:', error);
        return NextResponse.json({ error: 'Failed to save outward data' }, { status: 500 });
    }
    console.log(FormData)
}
