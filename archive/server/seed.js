import dotenv from "dotenv";
import mongoose from "mongoose";
import Service from "./models/Service.js";
import Project from "./models/Project.js";

dotenv.config();

const services = [
  { title: "Web development", description: "Fast, responsive websites and web apps built on modern frameworks.", icon: "world", order: 1 },
  { title: "App development", description: "Native and cross-platform mobile apps, from prototype to launch.", icon: "device-mobile", order: 2 },
  { title: "DevOps", description: "CI/CD pipelines, cloud infrastructure, and 24/7 deployment monitoring.", icon: "server-2", order: 3 },
  { title: "Cybersecurity", description: "Audits, hardening, and ongoing protection for your product and users.", icon: "shield-lock", order: 4 },
  { title: "SaaS products", description: "End-to-end SaaS builds — architecture, billing, multi-tenant setup.", icon: "cloud", order: 5 },
  { title: "Automation", description: "Workflow and business-process automation that cuts out repetitive work.", icon: "refresh", order: 6 },
];

const projects = [
  {
    title: "Customer portal rebuild",
    category: "Web & App Dev",
    description: "A responsive front-end rebuilt for speed and clarity.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    order: 1,
  },
  {
    title: "Multi-tenant SaaS launch",
    category: "SaaS",
    description: "Billing, auth, and dashboards shipped in one build.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80",
    order: 2,
  },
  {
    title: "Infra hardening & CI/CD",
    category: "DevOps & Security",
    description: "Pipeline setup with monitoring and security baked in.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    order: 3,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected. Seeding...");

  await Service.deleteMany({});
  await Project.deleteMany({});
  await Service.insertMany(services);
  await Project.insertMany(projects);

  console.log("Seed complete: 6 services, 3 projects inserted.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
