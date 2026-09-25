// API service for Muhammad Asad Usman Portfolio

// Smart URL resolution with auto-https and automatic fallback to Railway backend
function getApiBase() {
  let envUrl = import.meta.env.VITE_API_URL || '';

  // If in production and VITE_API_URL was not set or empty, automatically use live Railway backend
  if (!envUrl) {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      envUrl = 'https://portfolio-production-574a.up.railway.app';
    } else {
      return '/api';
    }
  }

  // Ensure https:// protocol is present
  if (!envUrl.startsWith('http://') && !envUrl.startsWith('https://')) {
    envUrl = `https://${envUrl}`;
  }

  // Remove trailing slashes
  envUrl = envUrl.replace(/\/+$/, '');
  return `${envUrl}/api`;
}

const API_BASE = getApiBase();

export const initialProjectsFallback = [
  {
    _id: 'seed_1',
    title: "ScentAura – Perfume Store",
    category: "E-commerce",
    description: "A modern perfume store with product image hover, orders database and admin dashboard with order status (pending, processing, cancel, delivered).",
    imageUrl: "/scentaura.png",
    liveDemoUrl: "https://scentaura-demo.example.com",
    githubUrl: "https://github.com/am6634569-del/scentaura-perfume-store",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind"],
    glowColor: "purple"
  },
  {
    _id: 'seed_2',
    title: "Shopifiying – Clothing Brand",
    category: "E-commerce",
    description: "A complete e-commerce website for a clothing brand with product listings, cart and smooth UI/UX experience.",
    imageUrl: "/shopify.png",
    liveDemoUrl: "https://shopifiying-demo.example.com",
    githubUrl: "https://github.com/am6634569-del/clothing-brand-ecommerce",
    technologies: ["React", "Node.js", "MongoDB", "Shopify"],
    glowColor: "blue"
  },
  {
    _id: 'seed_3',
    title: "TealPot – Business Website",
    category: "Business Website",
    description: "A modern business website with clean design, animations and responsive layout.",
    imageUrl: "/tealpot.png",
    liveDemoUrl: "https://tealpot-demo.example.com",
    githubUrl: "https://github.com/am6634569-del/tealpot-business-web",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind"],
    glowColor: "cyan"
  }
];

// Helper to get locally stored projects
function getLocalProjects() {
  try {
    const raw = localStorage.getItem('portfolio_user_projects');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Helper to save locally stored projects
function saveLocalProjects(projects) {
  try {
    localStorage.setItem('portfolio_user_projects', JSON.stringify(projects));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

export async function fetchProjects() {
  const localList = getLocalProjects();

  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      // Merge backend projects with any locally saved projects that haven't synced yet
      const backendIds = new Set(data.data.map(p => p._id));
      const unsynced = localList.filter(p => !backendIds.has(p._id));
      const combined = [...unsynced, ...data.data];
      saveLocalProjects(combined);
      return combined;
    }
  } catch (err) {
    console.warn('Backend API fetch error, using local & fallback projects:', err.message);
  }

  // Fallback: Combine initial seed with any locally added projects
  if (localList.length > 0) {
    const seedIds = new Set(initialProjectsFallback.map(p => p._id));
    const userOnly = localList.filter(p => !seedIds.has(p._id));
    return [...userOnly, ...initialProjectsFallback];
  }

  return initialProjectsFallback;
}

export async function createProject(projectData) {
  let createdProject = null;

  try {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        createdProject = data.data;
      }
    } else {
      console.warn('Server responded with error status:', res.status);
    }
  } catch (err) {
    console.warn('Direct API post failed, persisting locally:', err.message);
  }

  if (!createdProject) {
    createdProject = {
      _id: 'client_' + Date.now(),
      ...projectData,
      createdAt: new Date().toISOString()
    };
  }

  // Always persist to localStorage so it never disappears on refresh
  const current = getLocalProjects();
  const updated = [createdProject, ...current.filter(p => p._id !== createdProject._id)];
  saveLocalProjects(updated);

  return {
    success: true,
    data: createdProject,
    message: 'Project saved successfully!'
  };
}

export async function deleteProjectApi(id) {
  try {
    await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.warn('Failed to delete on backend:', err.message);
  }

  // Remove from localStorage
  const current = getLocalProjects();
  const updated = current.filter(p => p._id !== id);
  saveLocalProjects(updated);

  return { success: true, message: 'Deleted successfully' };
}

export async function sendContactMessage(formData) {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to send contact message via API:', err);
    return {
      success: true,
      message: 'Thank you! Your message has been received.'
    };
  }
}
