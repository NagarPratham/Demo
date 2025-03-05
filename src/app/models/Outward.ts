import mongoose from 'mongoose';

const outwardSchema = new mongoose.Schema({
  to: { type: String, required: true },
  address: { type: String, required: true },
  from: { type: String, required: true },
  subject: { type: String, required: true },
  briefDescription: { type: String, required: true },
  numberOfPages: { type: Number, required: true },
  remark: { type: String, default: '' },
  letterDate: { type: Date, required: true },
  relatedToInward: { type: String, required: true },
  pdfPath: { type: String, required: false, default: '' },
});

// Check if the model already exists
const Outward = mongoose.models.Outward || mongoose.model('Outward', outwardSchema);

export default Outward;
