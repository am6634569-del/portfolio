const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    default: 'Web Development',
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  liveDemoUrl: {
    type: String,
    default: '#',
  },
  githubUrl: {
    type: String,
    default: '#',
  },
  technologies: {
    type: [String],
    default: ['React', 'Tailwind CSS', 'Node.js'],
  },
  glowColor: {
    type: String,
    default: 'purple', // 'purple' | 'blue' | 'cyan'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
