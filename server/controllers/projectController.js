import Project from "../models/Project.js";
import { isConnected } from "../config/db.js";

const defaultProjects = [
  {
    _id: "prj-1",
    title: "Customer Portal & Analytics Engine",
    category: "Web & App Dev",
    description: "A responsive enterprise dashboard built for real-time streaming analytics, low-latency charts, and OAuth2 security.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    order: 1,
  },
  {
    _id: "prj-2",
    title: "Multi-tenant B2B SaaS Platform",
    category: "SaaS",
    description: "Stripe subscription billing, tenant isolated databases, granular RBAC permissions, and team workspace controls.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    order: 2,
  },
  {
    _id: "prj-3",
    title: "Zero-Trust Cloud Infrastructure & CI/CD",
    category: "DevOps & Security",
    description: "Kubernetes cluster hardening, SOC2 audit trail compliance, Terraform IaC deployment, and 24/7 Datadog monitoring.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    order: 3,
  },
];

export async function getProjects(req, res) {
  try {
    if (isConnected) {
      let projects = await Project.find().sort({ order: 1 });
      if (!projects || projects.length === 0) {
        projects = await Project.insertMany(defaultProjects);
      }
      return res.json({ success: true, data: projects });
    }
    return res.json({ success: true, data: defaultProjects });
  } catch (err) {
    return res.json({ success: true, data: defaultProjects });
  }
}

