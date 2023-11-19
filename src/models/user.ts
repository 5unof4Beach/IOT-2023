import mongoose from 'mongoose';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  authId: String,
  age: Number,
  height: Number,
  weight: Number,
  gender: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
