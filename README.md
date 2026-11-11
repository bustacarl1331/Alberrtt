# The Engineer's Desk — 3D Interactive Portfolio

An interactive, real-time 3D personal portfolio for **Albert Shony**, an Electronics & Communication Engineering (ECE) student at Christ College of Engineering, Autonomous, Irinjalakuda.

The portfolio is designed as a cozy, low-poly late-night engineering workspace diorama. Visitors explore a miniature 3D desk filled with electronics, gadgets, and personal artifacts. Each object is an interactive portal that smoothly directs the camera and reveals corresponding portfolio content.

---

## 🌟 Interactive Desk Objects & Section Map

| Desk Object | Section | Description & Features |
| :--- | :--- | :--- |
| 💻 **Low-Poly Laptop** | **About Me** | Glowing emissive screen with terminal flicker, keyboard grid, trackpad, and power LED. Opens Albert's bio, education, and technical profile. |
| ⚡ **Arduino Uno Board** | **Projects** | Blue PCB, ATmega chip, USB-B port, blinking RX/TX LEDs, breadboard, and jumper wires. Opens engineering and software projects showcase. |
| 📖 **Open Notebook & Pencil** | **Achievements** | Bound notebook with layered fanned pages and graphite pencil. Opens hackathon accolades, awards, certifications, and leadership roles. |
| 📷 **DSLR Camera** | **Photography** | Textured body, lens barrel with focus rings, mode dial, and red tally light. Opens a photo gallery highlighting visual creative work. |
| 🎧 **Over-Ear Headphones** | **Interests** | Low-poly headband, cushions, and cyan accent rings. Reveals hobbies, technology tinkering, and personal interests. |
| ☕ **Ceramic Mug** | **Contact** | Warm ceramic coffee mug with animated rising steam particles. Opens direct contact details, GitHub, and LinkedIn links. |
| 💡 **Articulated Desk Lamp** | **Resume** | Metallic lamp casting a warm localized pool of light on the wooden desk surface. Opens downloadable resume and career summary. |

### 🛠️ Secondary Atmospheric Props
- **Raspberry Pi 4 Model B** with blinking status LEDs and GPIO pin headers
- **ESP32 Dev Module** with blue status light
- **Oscilloscope** with an active animated green waveform display
- **Soldering Iron** on a stand with a glowing heated tip and point light
- **Mini Robotic Rover** that occasionally makes short test maneuvers
- **Desk Fan** with slowly rotating blades and cage
- **Digital LED Clock** showing workstation ambiance
- **Sticky Notes & Technical Textbooks** scattered naturally across the warm wooden desk
- **USB Thumb Drives & SD Cards**
- **Gentle Dust Particles** floating through the warm amber overhead spotlight

---

## 🚀 Tech Stack

- **Framework**: React 19 + Vite 8
- **3D Engine**: Three.js + React Three Fiber (R3F)
- **3D Helpers**: `@react-three/drei` (ContactShadows, Html, Preload)
- **Camera Transitions**: GSAP (GreenSock) for smooth cinematic camera easing
- **State Management**: Zustand
- **UI Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React + custom SVG brand icons

---

## 💻 Windows Installation & Setup Instructions

Follow these steps to set up and run the project on Windows (PowerShell or Command Prompt):

### 1. Prerequisites
- **Node.js** (v18.0.0 or later recommended): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)

Verify installation in Windows PowerShell:
```powershell
node -v
npm -v
```

### 2. Clone or Navigate to the Repository
```powershell
cd c:\Users\elber\Downloads\portfolio
```

### 3. Install Dependencies
```powershell
npm install
```

### 4. Run the Development Server
```powershell
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the URL displayed in PowerShell).

### 5. Build for Production
To generate an optimized production bundle:
```powershell
npm run build
```
The output will be placed in the `dist/` directory with relative asset paths.

### 6. Preview Production Build Locally
```powershell
npm run preview
```

---

## 🔒 Private profile mode

The starter content is intentionally safe to publish without personal contact details or photos.
Set `profileConfig.privateMode` in `src/data/content.js` to `false` when you are ready, then replace
the placeholder name, education, contact links, resume, projects, and photography entries with your
own information. Static GitHub Pages cannot keep values secret, so do not add private credentials or
other sensitive data to the repository.

## 🌐 Deploying to GitHub Pages

### Method A: Automated Deployment via GitHub Actions (Recommended)
This repository includes a preconfigured GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push your repository to GitHub:
   ```powershell
   git init
   git add .
   git commit -m "feat: complete 3D interactive portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to the `main` branch will automatically build and deploy your portfolio.

### Method B: Manual Deployment (`gh-pages`)
1. Install `gh-pages`:
   ```powershell
   npm install -D gh-pages
   ```
2. Add deploy script to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run:
   ```powershell
   npm run deploy
   ```

---

## ✏️ Customizing Content

All portfolio content is decoupled from the 3D scene and stored cleanly in:
`src/data/content.js`

You can edit:
- **`aboutData`**: Bio paragraphs, tagline, title, and institutional affiliations.
- **`projectsData`**: Project names, descriptions, tech stacks, status tags, and GitHub / live demo URLs.
- **`achievementsData`**: Awards, hackathons, certifications, and leadership roles.
- **`skillsData`**: Categorized technical proficiencies (Programming, Embedded, AI/ML, Software, Engineering).
- **`educationData`**: Degree title, college, university, and expected graduation.
- **`contactData`**: Email address, GitHub profile URL, LinkedIn profile URL, and resume link.
- **`photographyData`**: Titles and image paths for the photo gallery.

---

## ⚡ Performance & Accessibility Features

- **Procedural Low-Poly Primitives**: No heavy GLB/GLTF models to download; instant loading with minimal memory footprint.
- **Adaptive DPR**: Canvas uses `dpr={[1, 1.5]}` for high performance on Retina/HiDPI screens without GPU throttling.
- **Preload & Visibility Pausing**: Automatically pauses animation loop when the browser tab is hidden to conserve battery and CPU/GPU.
- **Reduced Motion Support**: Detects `prefers-reduced-motion` and scales down idle bobbing and camera drift.
- **WebGL Fallback**: Graceful fallback display if the visitor's browser or device lacks WebGL hardware acceleration.
- **Mobile Responsive**: Right-hand panel scales dynamically on touch devices; touch gestures and tapping are fully supported.
