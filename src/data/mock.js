// Mock data for Garvit's Portfolio
import animbits from '../assets/animbits.png'
import flexhunt from '../assets/flexhunt.png'
import food from '../assets/food.png'
import freshstart from '../assets/freshstart.png'
import mindflow from '../assets/mindflow.png'
import cli from '../assets/cli.png'
import motion from '../assets/motion.png'

export const personalInfo = {
  name: "Garvit Joshi",
  title: "Frontend Developer",
  email: "garvitjoshi543@gmail.com",
  bio: "I’m a frontend dev focused on building responsive, modern web apps that look good and feel smooth. Constantly learning and growing.",
  location: "India",
  yearsOfExperience: "1+",
  techStack: [
    { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Node.js", icon: "nodejs" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Tailwind CSS", icon: "tailwindcss" }
  ],
  skills: [
    "React.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Node.js",
    "Git",
    "Responsive Design",
    "RESTful APIs",
    "Express.js",
    "MongoDB"
  ]
};

export const projects = [
  {
    id: 1,
    title: "AnimBits",
    description: "A production-ready animation library for React with 50+ components powered by Framer Motion. Built with TypeScript and integrates seamlessly with shadcn CLI for one-command installation. Includes animated icons, buttons, cards, loaders, and page transitions. Fully responsive, accessible with reduced-motion support, and works out of the box with Next.js and Vite.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "https://animbits.dev",
    githubUrl: "https://github.com/Garvit1000/animbits",
    image: animbits,
    featured: true
  },
  {
    id: 2,
    title: "Motion Icons",
    description: "Beautiful animated icons for React - Where simplicity meets motion. Motion Icons is a powerful React component library that brings your icons to life with smooth animations, entrance effects, and interactive behaviors. Built on top of Lucide React icons with 3500+ icons and 15+ animation presets.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Shadcn", "Typescript"],
    liveUrl: "https://motionicons.dev",
    githubUrl: "https://github.com/Garvit1000/motion-icons",
    image: motion,
    featured: true
  },
  {
    id: 3,
    title: "FreshStart AI",
    description: "a SaaS platform delivering AI-powered resume optimization with 80%+ ATS score targets. Integrated LinkedIn headline & About-section optimizers to boost recruiter visibility.and Developed edit suggestions and PDF export workflows for user-customized resumes.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Express"],
    liveUrl: "https://freshstartai-1.onrender.com/",
    githubUrl: "https://github.com/Garvit1000/freshstartAI",
    image: freshstart,
    featured: true
  },
  {
    id: 4,
    title: "Flexhunt",
    description: "a job platform with skill-based matchmaking and recruiter management tools. Built seller dashboard with PayPal payment integration and real-time transaction logging. Created a community forum module for discussions and professional networking.",
    technologies: ["React", "JavaScript", "CSS3", "Firebase"],
    liveUrl: "https://www.flexhunt.co/",
    githubUrl: "https://github.com/Garvit1000/flexhunt.git",
    image: flexhunt,
    featured: true
  },
  {
    id: 5,
    title: "Create Vite shadcn app",
    description: "A zero-config CLI tool to scaffold full-stack React applications with authentication and database integration. Build production-ready apps in seconds with Clerk authentication and PostgreSQL database support built-in. 1K+ downloads",
    technologies: ["React", "PostgrSql", "Tailwind CSS", "CLI"],
    liveUrl: "https://www.npmjs.com/package/create-vite-shadcn-app",
    githubUrl: "https://github.com/Garvit1000/create-vite-shadcn-app.git",
    image: cli,
    featured: false
  },
  {
    id: 6,
    title: "Food Delivery website",
    description: "A full-stack food delivery web application built using the MERN (MongoDB, Express, React, Node.js) stack. This project allows users to browse menus, place orders, and track deliveries in real-time. Features include user authentication, payment gateway integration, and a admin dashboard for managing orders, restaurants, and menus.",
    technologies: ["React", "CSS", "MongoDB", "Node.js", "Express"],
    liveUrl: "https://github.com/Garvit1000/food-delivery-website.git",
    githubUrl: "https://github.com/Garvit1000/food-delivery-website.git",
    image: food,
    featured: false
  },
  // {
  //   id: 7,
  //   title: "Mindflow App",
  //   description: "MindFlow, your personal AI-powered mental wellness companion! This app is designed to provide you with tools and resources to support your mental health journey. Whether you're looking for soothing music, personalized diet plans, or just someone to talk to, MindFlow is here for you.",
  //   technologies: ["ReactNative", "REST API", "Tailwind CSS", "Expo"],
  //   liveUrl: "https://recipe-finder.example.com",
  //   githubUrl: "https://github.com/garvit/recipe-finder",
  //   image: mindflow,
  //   featured: false
  // }
];

export const experience = [
  {
    id: 1,
    company: "Founder Flow",
    position: "Founding Web Developer",
    period: "June 2025 - Sept 2025",
    description: `- Developed and launched the **company website**, including a **modern onboarding** and **landing page**.
- Built and deployed the site hosted and managed **production infrastructure** to ensure **high availability**.
- Built an **admin panel** to monitor user signups and engagement.
- Integrated **front-end** with **database** and **authentication systems** to enable reliable data flow.
- Translated **Figma designs** into **pixel-perfect, responsive UI** and iterated on UX with the design team.
- Led the initial **development team**, prioritized features, and supported **MVP delivery**.`
  },
  {
    id: 1,
    company: "Dtodstint Services Pvt Ltd",
    position: "Frontend Developer",
    period: "Dec 2024 - March 2025",
    description: `- Developed and launched the **company website**, including a **modern onboarding** and **landing page**.
- Implemented **“Add to Cart” functionality** for an **e-commerce module**, increasing conversion readiness.
- Designed and developed a **dynamic services page** to enhance user engagement and interaction.
- Built the **admin panel**, enabling seamless **client management** of services.
- Improved **site responsiveness** across devices; diagnosed and fixed **critical frontend bugs**.`
  },

];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Garvit1000",
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/garvit-joshi1",
    icon: "linkedin"
  },
  {
    name: "Twitter",
    url: "https://tx.com/Garvit1000",
    icon: "twitter"
  }
];
