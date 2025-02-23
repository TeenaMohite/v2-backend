import mongoose from 'mongoose';

const userSchema2 = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  dateCreated: { type: String, default: () => new Date().toISOString().slice(0, 16) },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

export default mongoose.model('User2', userSchema2);