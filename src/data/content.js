// ============================================================
// Portfolio content template. Replace private placeholders before publishing.

export const profileConfig = {
  privateMode: true,
};
// ============================================================

// --------------------------------------------------
// About Section
// --------------------------------------------------
export const aboutData = {
  name: "Your Name",
  title: "Electronics & Communication Engineering Student",
  college: "Add your college",
  university: "Add your university",
  tagline: "Building at the intersection of hardware and intelligence.",
  bio: [
    "This portfolio is ready for your story. Add a short introduction about your background, interests, and the kind of work you enjoy.",
    "Use this space to describe your strongest skills, the problems you like solving, and the tools or technologies you are learning.",
  ],
};

// --------------------------------------------------
// Projects Section
// --------------------------------------------------
export const projectsData = [
  {
    id: "face-recognition-attendance",
    title: "AI Face Recognition Attendance System",
    description:
      "An AI-powered attendance tracking system that uses facial recognition to identify students and mark attendance automatically. Built with DeepFace for face verification and Flask for the web interface, it eliminates the need for manual roll calls and reduces proxy attendance.",
    technologies: ["Python", "OpenCV", "DeepFace", "Flask"],
    status: "Completed",
    github: "#",
    demo: "#",
  },
  {
    id: "bookmyturf",
    title: "BookMyTurf",
    description:
      "A college facility booking web application that allows students and staff to reserve turfs, labs, and common spaces. Features real-time availability checking, booking management, and an admin dashboard for facility coordinators.",
    technologies: ["React", "Node.js", "MongoDB"],
    status: "Completed",
    github: "#",
    demo: "#",
  },
  {
    id: "bluepulse",
    title: "BluePulse",
    description:
      "A community health monitoring system that connects IoT-enabled wearable devices to a Flutter mobile application via Firebase. It tracks vital signs in real time and provides health insights to users and community health workers.",
    technologies: ["Flutter", "Firebase", "IoT"],
    status: "In Progress",
    github: "#",
    demo: "#",
  },
  {
    id: "contactless-vital-signs",
    title: "Contactless Vital Signs Monitoring",
    description:
      "A non-contact system for measuring vital signs such as heart rate and respiratory rate using a standard webcam. It leverages computer vision and signal processing techniques to extract physiological signals from subtle skin color changes in video frames.",
    technologies: ["Python", "OpenCV", "Signal Processing"],
    status: "Completed",
    github: "#",
    demo: "#",
  },
  {
    id: "smart-safety-band",
    title: "Smart Safety Band for Miners",
    description:
      "An IoT wearable safety device designed for mining workers that monitors environmental hazards like toxic gas levels, temperature, and humidity. It sends real-time alerts to a central monitoring station and triggers on-device warnings when dangerous thresholds are exceeded.",
    technologies: ["Arduino", "ESP32", "Sensors"],
    status: "Completed",
    github: "#",
    demo: "#",
  },
  {
    id: "smascho",
    title: "Smascho",
    description:
      "A mobile application built with Flutter and Dart, backed by Firebase for authentication and data storage. It provides a streamlined user experience with real-time data synchronization and push notifications.",
    technologies: ["Flutter", "Dart", "Firebase"],
    status: "In Progress",
    github: "#",
    demo: "#",
  },
];

// --------------------------------------------------
// Achievements Section
// --------------------------------------------------
export const achievementsData = [
  {
    id: "hackathon-1",
    title: "National Level Hackathon Finalist",
    category: "Hackathon",
    date: "2025",
    description:
      "Participated in a 24-hour national-level hackathon and built a working prototype that was selected among the top finalists. Collaborated with a cross-functional team to ideate, design, and develop a solution under time pressure.",
    icon: "Trophy",
  },
  {
    id: "award-1",
    title: "Best Project Award",
    category: "Award",
    date: "2025",
    description:
      "Received recognition for an outstanding engineering project during the annual technical exhibition at Christ College of Engineering. The project was evaluated on innovation, technical depth, and real-world applicability.",
    icon: "Award",
  },
  {
    id: "event-1",
    title: "Technical Event Coordinator",
    category: "Leadership",
    date: "2025",
    description:
      "Coordinated and organized a technical event as part of the college's annual tech fest. Managed logistics, participant registrations, and ensured smooth execution of coding competitions and workshops.",
    icon: "Users",
  },
  {
    id: "certification-1",
    title: "Professional Certification",
    category: "Certification",
    date: "2025",
    description:
      "Earned a professional certification in a relevant technical domain, demonstrating proficiency in key concepts and practical applications. Completed coursework and assessments through an accredited online platform.",
    icon: "BadgeCheck",
  },
];

// --------------------------------------------------
// Skills Section
// --------------------------------------------------
export const skillsData = {
  Programming: ["C", "C++", "Python", "JavaScript"],
  Embedded: ["Arduino", "ESP32", "Raspberry Pi", "TM4C123"],
  "AI/ML": ["OpenCV", "YOLO", "DeepFace", "InsightFace", "TensorFlow"],
  Software: ["React", "Flutter", "Flask", "Git", "Docker"],
  Engineering: ["MATLAB", "Signal Processing", "Circuit Design"],
};

// --------------------------------------------------
// Education Section
// --------------------------------------------------
export const educationData = {
  degree: "Bachelor of Technology (B.Tech)",
  branch: "Electronics & Communication Engineering",
  college: "Add your college",
  university: "Add your university",
  duration: "Add your study period",
};

// --------------------------------------------------
// Contact Section
// --------------------------------------------------
export const contactData = {
  email: "",
  github: "",
  linkedin: "",
  resume: "",
};

// --------------------------------------------------
// Interests Section
// --------------------------------------------------
export const interestsData = [
  "Technology Experimentation",
  "Photography",
  "Electronics",
  "Software Development",
  "Creative Projects",
  "Embedded Systems",
];

// --------------------------------------------------
// Photography Section
// --------------------------------------------------
export const photographyData = [];

// --------------------------------------------------
// Navigation Objects (3D Desk Objects → Sections)
// --------------------------------------------------
export const navObjects = [
  {
    id: "about",
    name: "About Me",
    subtitle: "Get to know me",
    objectType: "laptop",
    position: [0, 0.84, -0.55],
    cameraTarget: [0, 0.95, -0.55],
    cameraPosition: [0, 1.48, 0.62],
  },
  {
    id: "projects",
    name: "Projects",
    subtitle: "Things I've built",
    objectType: "arduino",
    position: [1.2, 0.82, -0.3],
    cameraTarget: [1.2, 0.82, -0.3],
    cameraPosition: [1.2, 1.8, 1.7],
  },
  {
    id: "achievements",
    name: "Achievements",
    subtitle: "Milestones & recognition",
    objectType: "notebook",
    position: [-0.5, 0.82, 0.8],
    cameraTarget: [-0.5, 0.82, 0.8],
    cameraPosition: [-0.5, 1.8, 2.8],
  },
  {
    id: "photography",
    name: "Photography",
    subtitle: "Through my lens",
    objectType: "camera",
    position: [1.8, 0.82, 0.6],
    cameraTarget: [1.8, 0.82, 0.6],
    cameraPosition: [1.8, 1.8, 2.6],
  },
  {
    id: "interests",
    name: "Interests",
    subtitle: "What drives me",
    objectType: "headphones",
    position: [-1.8, 0.82, 0.5],
    cameraTarget: [-1.8, 0.82, 0.5],
    cameraPosition: [-1.8, 1.8, 2.5],
  },
  {
    id: "contact",
    name: "Contact",
    subtitle: "Let's connect",
    objectType: "mug",
    position: [0.5, 0.82, -0.8],
    cameraTarget: [0.5, 0.82, -0.8],
    cameraPosition: [0.5, 1.8, 1.2],
  },
  {
    id: "resume",
    name: "Resume",
    subtitle: "My qualifications",
    objectType: "lamp",
    position: [2.2, 0.82, -0.8],
    cameraTarget: [2.2, 0.82, -0.8],
    cameraPosition: [2.2, 1.8, 1.2],
  },
];
