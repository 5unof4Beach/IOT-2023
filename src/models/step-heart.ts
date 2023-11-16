import mongoose from 'mongoose';

const StepHeartSchema = new mongoose.Schema(
  {
    userId: String,
    step_count: Number,
    heart_rate: Number,
  },
  { timestamps: true }
);

export default mongoose.models.StepHeart || mongoose.model('step-heart', StepHeartSchema);
