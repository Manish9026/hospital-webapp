import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true }, // years of experience

  location: { type: String },
  fee: { type: Number }, // for filtering low to high, high to low

  image: { type: String },

  // New fields for filtering/sorting:
  consultType: [{ type: String, enum: ['online', 'hospital'] }], // supports multiple modes
  facility: [{ type: String }], // e.g., ['X-Ray', 'ICU', 'Lab']
  languages: [{ type: String }], // languages the doctor can speak
  likes: { type: Number, default: 0 }, // for sorting by popularity
  available: { type: Boolean, default: true }, // for availability sort/filter
});

export const doctorModel = mongoose.model("Doctor", DoctorSchema);
