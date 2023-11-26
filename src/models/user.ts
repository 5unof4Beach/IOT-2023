import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: String,
  age: Number,
  height: Number,
  weight: Number,
  gender: String,
  consumption_analytics: String,
  recommandation_analytics: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
