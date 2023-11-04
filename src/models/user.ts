import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  bmi: {
    age: Number,
    height: Number,
    weight: Number,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
