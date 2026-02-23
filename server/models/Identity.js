const mongoose = require('mongoose');

const identitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  profilePhotoUrl: { type: String, required: true },
  brandLine1: { type: String, default: '' },
  brandLine2: { type: String, default: '' },
  companyName: { type: String, default: '' },
  logoUrl: { type: String, default: '' },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, default: '' },
  officeAddress: { type: String, default: '' },
  mapsLink: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  facebook: { type: String, default: '' },
  instagram: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  tiktok: { type: String, default: '' },
  youtube: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Identity', identitySchema);
