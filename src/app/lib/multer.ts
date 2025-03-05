import multer from 'multer';
import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

// Ensure the upload directory exists
const uploadDirectory = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Set destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // File naming
    },
});

const upload = multer({ storage: storage }).single('file');

// Define a custom request type that includes the 'file' property from multer
export interface MulterRequest extends IncomingMessage {
    file: Express.Multer.File | undefined;
}

// Helper function to handle file uploads in Next.js API routes
export const runMulter = (req: MulterRequest, res: ServerResponse, next: (err?: any) => void) => {
    upload(req as any, res as any, (err: any) => {
        if (err) {
            return next(err); // Pass the error if multer fails
        }
        next(); // Continue if the upload is successful
    });
};
