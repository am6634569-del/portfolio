const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Message = require('./models/Message');
const initialProjects = require('./seedData');

const DATA_DIR = path.join(__dirname, 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data folder and default files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(PROJECTS_FILE)) {
  const seeded = initialProjects.map((p, idx) => ({
    _id: 'seed_' + (idx + 1),
    ...p,
    createdAt: new Date().toISOString()
  }));
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(seeded, null, 2));
}

if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}

function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}

// Read local JSON helper
function readJson(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading JSON file:', filePath, err);
    return [];
  }
}

// Write local JSON helper
function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing JSON file:', filePath, err);
  }
}

// Project Operations
async function getProjects() {
  if (isMongoConnected()) {
    try {
      const count = await Project.countDocuments();
      if (count === 0) {
        // Seed MongoDB if empty
        await Project.insertMany(initialProjects);
      }
      return await Project.find().sort({ createdAt: -1 });
    } catch (err) {
      console.warn('Mongo query failed, falling back to local file:', err.message);
    }
  }
  return readJson(PROJECTS_FILE);
}

async function addProject(projectData) {
  if (isMongoConnected()) {
    try {
      const project = new Project(projectData);
      return await project.save();
    } catch (err) {
      console.warn('Mongo save failed, falling back to local file:', err.message);
    }
  }
  const projects = readJson(PROJECTS_FILE);
  const newProject = {
    _id: Date.now().toString(),
    title: projectData.title || 'Untitled Project',
    category: projectData.category || 'Web Development',
    description: projectData.description || '',
    imageUrl: projectData.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    liveDemoUrl: projectData.liveDemoUrl || '#',
    githubUrl: projectData.githubUrl || '#',
    technologies: Array.isArray(projectData.technologies) ? projectData.technologies : ['React', 'Tailwind CSS'],
    glowColor: projectData.glowColor || 'purple',
    createdAt: new Date().toISOString()
  };
  projects.unshift(newProject);
  writeJson(PROJECTS_FILE, projects);
  return newProject;
}

async function updateProject(id, updateData) {
  if (isMongoConnected()) {
    try {
      return await Project.findByIdAndUpdate(id, updateData, { new: true });
    } catch (err) {
      console.warn('Mongo update failed, falling back to local file:', err.message);
    }
  }
  const projects = readJson(PROJECTS_FILE);
  const index = projects.findIndex(p => p._id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updateData };
    writeJson(PROJECTS_FILE, projects);
    return projects[index];
  }
  return null;
}

async function deleteProject(id) {
  if (isMongoConnected()) {
    try {
      return await Project.findByIdAndDelete(id);
    } catch (err) {
      console.warn('Mongo delete failed, falling back to local file:', err.message);
    }
  }
  const projects = readJson(PROJECTS_FILE);
  const filtered = projects.filter(p => p._id !== id);
  writeJson(PROJECTS_FILE, filtered);
  return { success: true, id };
}

// Contact Message Operations
async function addMessage(messageData) {
  if (isMongoConnected()) {
    try {
      const msg = new Message(messageData);
      return await msg.save();
    } catch (err) {
      console.warn('Mongo message save failed, falling back to local file:', err.message);
    }
  }
  const messages = readJson(MESSAGES_FILE);
  const newMsg = {
    _id: Date.now().toString(),
    ...messageData,
    createdAt: new Date().toISOString()
  };
  messages.unshift(newMsg);
  writeJson(MESSAGES_FILE, messages);
  return newMsg;
}

module.exports = {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  addMessage,
  isMongoConnected
};
