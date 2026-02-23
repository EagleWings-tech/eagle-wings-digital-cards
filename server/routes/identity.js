const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Identity = require('../models/Identity');

router.post('/identity', async (req, res) => {
  try {
    const b = req.body || {};

    const fullName = (b.fullName || '').trim();
    const jobTitle = (b.jobTitle || '').trim();
    const mobile = (b.mobile || '').trim();
    const email = (b.email || '').trim();
    const profilePhotoBase64 = typeof b.profilePhotoBase64 === 'string' ? b.profilePhotoBase64.trim() : '';

    if (!fullName || !jobTitle || !mobile || !email) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Full name, job title, mobile and email are required.'
      });
    }

    if (!profilePhotoBase64 || !profilePhotoBase64.startsWith('data:image/')) {
      const hint = !profilePhotoBase64
        ? ' Request body may be too large (try a smaller image) or the field was not sent.'
        : ' Profile photo must be a data URL (data:image/...).';
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Profile photo is required.' + hint
      });
    }

    const id = crypto.randomBytes(6).toString('hex');
    const doc = {
      id,
      fullName,
      jobTitle,
      profilePhotoUrl: profilePhotoBase64,
      // brandLine1: (b.brandLine1 || '').trim(),
      // brandLine2: (b.brandLine2 || '').trim(),
      // companyName: (b.companyName || '').trim(),
      // logoUrl: (b.brandLogoBase64 && b.brandLogoBase64.startsWith('data:image/')) ? b.brandLogoBase64 : '',
      mobile,
      email,
      website: (b.website || '').trim(),
      officeAddress: (b.officeAddress || '').trim(),
      mapsLink: (b.mapsLink || '').trim(),
      whatsapp: (b.whatsapp || '').trim(),
      facebook: (b.facebook || '').trim(),
      instagram: (b.instagram || '').trim(),
      linkedin: (b.linkedin || '').trim(),
      tiktok: (b.tiktok || '').trim(),
      youtube: (b.youtube || '').trim()
    };

    await Identity.create(doc);

    res.status(201).json({
      id,
      cardUrl: '/card/?id=' + id,
      message: 'Identity created successfully.'
    });
  } catch (err) {
    console.error('POST /api/identity error:', err);
    res.status(500).json({
      error: 'Server error',
      message: err.message || 'Failed to create identity.'
    });
  }
});

// GET /api/identity/:id
router.get('/identity/:id', async (req, res) => {
  try {
    const identity = await Identity.findOne({ id: req.params.id }).lean();
    if (!identity) {
      return res.status(404).json({ error: 'Not found', message: 'Identity not found.' });
    }
    delete identity._id;
    delete identity.__v;
    delete identity.createdAt;
    delete identity.updatedAt;
    res.json(identity);
  } catch (err) {
    console.error('GET /api/identity/:id error:', err);
    res.status(500).json({
      error: 'Server error',
      message: err.message || 'Failed to load identity.'
    });
  }
});

module.exports = router;
