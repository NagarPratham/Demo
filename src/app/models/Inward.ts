import mongoose from 'mongoose';

const InwardSchema = new mongoose.Schema({
    customId: { type: String, required: true, unique: true },
    inwardType: { type: String, required: true },
    letterDate: { type: String, required: true },
    receivedDate: { type: String, required: true },
    subject: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    address: { type: String },
    description: { type: String },
    language: { type: String },
    pages: { type: Number, required: true },
    remark: { type: String },
    file: { type: String, required: true }, // Store PDF as Base64
});

export default mongoose.models.Inward || mongoose.model('Inward', InwardSchema);
