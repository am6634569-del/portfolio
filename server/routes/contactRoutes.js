const express = require('express');
const router = express.Router();
const storage = require('../storage');

// POST /api/contact - Send a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }

    const newMsg = await storage.addMessage({
      name,
      email,
      phone: phone || '',
      message
    });

    res.status(201).json({
      success: true,
      data: newMsg,
      message: 'Message sent successfully! Thank you for reaching out.'
    });
  } catch (error) {
    console.error('Error in contact form:', error);
    res.status(500).json({ success: false, message: 'Server error sending message' });
  }
});

module.exports = router;
