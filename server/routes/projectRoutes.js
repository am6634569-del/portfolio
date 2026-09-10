const express = require('express');
const router = express.Router();
const storage = require('../storage');

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await storage.getProjects();
    res.json({
      success: true,
      data: projects,
      source: storage.isMongoConnected() ? 'mongodb' : 'local_storage'
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Server error fetching projects' });
  }
});

// POST /api/projects - Create a new project (with image, demo link, github link, etc.)
router.post('/', async (req, res) => {
  try {
    const { title, category, description, imageUrl, liveDemoUrl, githubUrl, technologies, glowColor } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    let parsedTech = technologies;
    if (typeof technologies === 'string') {
      parsedTech = technologies.split(',').map(t => t.trim()).filter(Boolean);
    }

    const newProject = await storage.addProject({
      title,
      category: category || 'Web Development',
      description,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      liveDemoUrl: liveDemoUrl || '#',
      githubUrl: githubUrl || '#',
      technologies: parsedTech && parsedTech.length > 0 ? parsedTech : ['React', 'Tailwind CSS'],
      glowColor: glowColor || 'purple'
    });

    res.status(201).json({
      success: true,
      data: newProject,
      message: 'Project created successfully!'
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, message: 'Server error creating project' });
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', async (req, res) => {
  try {
    const updated = await storage.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: updated, message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, message: 'Server error updating project' });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', async (req, res) => {
  try {
    await storage.deleteProject(req.params.id);
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, message: 'Server error deleting project' });
  }
});

module.exports = router;
