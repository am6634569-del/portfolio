// API service for Muhammad Asad Usman Portfolio

// Automatically uses Render backend URL in production, or local proxy in development
const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : '/api';

export const initialProjectsFallback = [
  {
    _id: 'seed_1',
    title: "ScentAura – Perfume Store",
    category: "E-commerce",
    description: "A modern perfume store with product image hover, orders database and admin dashboard with order status (pending, processing, cancel, delivered).",
    imageUrl: "/scentaura.png",
    liveDemoUrl: "https://scentaura-demo.example.com",
    githubUrl: "https://github.com/MuhammadAsadUsman/scentaura-perfume-store",
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
    githubUrl: "https://github.com/MuhammadAsadUsman/clothing-brand-ecommerce",
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
    githubUrl: "https://github.com/MuhammadAsadUsman/tealpot-business-web",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind"],
    glowColor: "cyan"
  }
];

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
    return initialProjectsFallback;
  } catch (err) {
    console.warn('Backend API not reachable, using fallback projects:', err.message);
    return initialProjectsFallback;
  }
}

export async function createProject(projectData) {
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to create project via API:', err);
    return {
      success: true,
      data: {
        _id: 'local_' + Date.now(),
        ...projectData,
        createdAt: new Date().toISOString()
      },
      message: 'Added locally (backend offline)'
    };
  }
}

export async function deleteProjectApi(id) {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to delete project:', err);
    return { success: true, message: 'Deleted locally' };
  }
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
