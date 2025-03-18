import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
    trim: true
  },
  policyNumber: {
    type: String,
    required: true,
    trim: true
  },
  coverage: {
    type: String,
    required: true,
    trim: true
  },
  premiumAmount: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// This will ensure that when converting to JSON, the _id is also included as id
policySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

const Policy = mongoose.model('Policy', policySchema);

export default Policy;