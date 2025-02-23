import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  survey: { type: String, required: true },
  employeesCount: { type: Number, required: true },
  participation: { type: String, default: '0/0 (0%)' },
  status: { type: String, default: 'IN PROGRESS' },
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);