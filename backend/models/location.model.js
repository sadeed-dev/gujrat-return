import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
   state: { type: String },     // ✅ NEW: State
  district: { type: String },  // ✅ Existing
  tehsil: { type: String },    // ✅ 
    location: { type: String },  
        pincode: { type: String },  



  updatedAt: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);
export default Location;