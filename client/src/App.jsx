import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutServices from './components/AboutServices';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Footer from './components/Footer';
import AddProjectModal from './components/AddProjectModal';
import ContactModal from './components/ContactModal';
import { fetchProjects, createProject, deleteProjectApi } from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleAddProject = async (newProjectData) => {
    const res = await createProject(newProjectData);
    if (res.success && res.data) {
      setProjects((prev) => [res.data, ...prev]);
    } else {
      // Fallback optimistic update
      setProjects((prev) => [{ _id: Date.now().toString(), ...newProjectData }, ...prev]);
    }
  };

  const handleDeleteProject = async (projectId) => {
    await deleteProjectApi(projectId);
    setProjects((prev) => prev.filter((p) => p._id !== projectId));
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-purple-600 selection:text-white relative">
      {/* Navigation */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <main>
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* About & Services Section */}
        <AboutServices />

        {/* Technologies / Tech Stack */}
        <TechStack />

        {/* Featured Projects with Image & Link support */}
        <Projects
          projects={projects}
          onOpenAddModal={() => setIsAddProjectOpen(true)}
          onDeleteProject={handleDeleteProject}
        />
      </main>

      {/* Footer & Contact Section */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onProjectAdded={handleAddProject}
      />

      {/* Contact / Hire Me Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
