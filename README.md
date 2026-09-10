# ⚡ Muhammad Asad Usman - Full Stack MERN Portfolio

A dark-neon animated, fully responsive portfolio website built with **React, Tailwind CSS, Node.js, Express.js, and MongoDB**, tailored to match the reference design.

---

## 🌟 Key Features

1. **Exact Design Match**:
   - Dark neon theme (`#07090e`) with electric cyan (`#00e5ff`) and purple (`#a855f7`) accents.
   - Glassmorphic navigation bar with active section highlight & "Hire Me" action.
   - Hero section with developer portrait, glowing aura backplate, "Let's Build Something Great" note, and floating status card (Location, Freelance, Experience).
   - About & Services: Bio story + 6 animated glowing service cards (MERN Stack, Shopify E-commerce, Responsive UI, API Integration, Git & GitHub, Problem Solving).
   - Technologies Dock: Floating glassmorphic dock with glowing icons (React.js, Node.js, Express.js, MongoDB, Shopify, Git, GitHub, Tailwind CSS, JavaScript, HTML & CSS).
   - Wavy neon footer with contact links and copyright.

2. **Dynamic Project Cards (Link & Image Options)**:
   - Preloaded with the 3 showcase projects from the design:
     - **ScentAura – Perfume Store (E-commerce)**
     - **Shopifiying – Clothing Brand (E-commerce)**
     - **TealPot – Business Website**
   - Clickable **Live Demo** link button on every card.
   - Clickable **GitHub** repository link button on every card.
   - **Interactive Add Project Modal**:
     - Allows adding new projects dynamically with:
       - Title & Category
       - Description
       - **Image URL** with live image preview & quick sample presets
       - **Live Demo Link**
       - **GitHub Link**
       - Technologies tags
       - Neon Glow style (Purple, Blue, Cyan)
     - Saves to the Express + MongoDB backend and immediately renders the new animated card on screen with celebratory confetti!

3. **Resilient Dual-Mode Backend**:
   - Connects to MongoDB via Mongoose.
   - If MongoDB is not running locally, the server automatically uses local persistent JSON storage (`server/data/projects.json`), ensuring the app runs immediately without throwing database errors or requiring manual setup!
   - Simply set `MONGO_URI` in `server/.env` whenever you want to connect to MongoDB Atlas.

4. **Working Contact Form / Hire Me**:
   - Visitors can submit inquiries via the "Hire Me" or "Send Message" buttons.
   - Persists contact messages in MongoDB or local storage.

---

## 🚀 Quick Start Guide

### 1. Install All Dependencies (One-time)
Run from the root directory:
```bash
npm run install:all
```
*(Or install in both `server` and `client` folders individually)*

### 2. Start Both Backend and Frontend Concurrently
From the root directory:
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 🛠️ Project Structure

```text
d:/Portfolio/
├── client/                     # React + Tailwind CSS frontend
│   ├── public/                 # Assets (profile.png, project thumbnails)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header with navigation & Hire Me
│   │   │   ├── Hero.jsx            # Hero banner, developer photo, floating stats
│   │   │   ├── AboutServices.jsx   # About story & 6 glowing service cards
│   │   │   ├── TechStack.jsx       # Floating glassmorphic dock
│   │   │   ├── Projects.jsx        # Project grid & filter
│   │   │   ├── ProjectCard.jsx     # Animated card with image, demo & github links
│   │   │   ├── AddProjectModal.jsx # Form to add projects with image & links
│   │   │   ├── ContactModal.jsx    # Contact / Hire Me inquiry modal
│   │   │   ├── Footer.jsx          # Wavy neon footer & social contact
│   │   │   └── Icons.jsx           # SVG brand icons
│   │   ├── services/
│   │   │   └── api.js              # REST API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Node.js + Express + MongoDB backend
│   ├── models/
│   │   ├── Project.js          # Mongoose Project schema
│   │   └── Message.js          # Mongoose Contact Message schema
│   ├── routes/
│   │   ├── projectRoutes.js    # GET, POST, PUT, DELETE /api/projects
│   │   └── contactRoutes.js    # POST /api/contact
│   ├── data/                   # Persistent fallback storage
│   ├── storage.js              # Dual-mode storage handler (MongoDB + Local)
│   ├── seedData.js             # Initial project data
│   ├── server.js               # Express entry point
│   ├── .env                    # Environment variables (PORT, MONGO_URI)
│   └── package.json
│
├── package.json                # Root concurrently runner
└── README.md
```

---

## 📡 REST API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Add a new project (title, category, description, imageUrl, liveDemoUrl, githubUrl, technologies, glowColor)
- `PUT /api/projects/:id` - Update existing project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/contact` - Submit contact inquiry message
- `GET /api/health` - Server & database health check
