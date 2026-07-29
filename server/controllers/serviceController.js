import Service from "../models/Service.js";
import { isConnected } from "../config/db.js";

const defaultServices = [
  { _id: "srv-1", title: "Web Development", description: "High-performance web apps built with React 18, Vite, Next.js & modern full-stack architectures.", icon: "world", order: 1 },
  { _id: "srv-2", title: "App Development", description: "Native & cross-platform iOS & Android mobile applications built for low latency and high scale.", icon: "device-mobile", order: 2 },
  { _id: "srv-3", title: "DevOps & Cloud", description: "CI/CD pipelines, Kubernetes container orchestration, and automated AWS/GCP cloud infrastructure.", icon: "server-2", order: 3 },
  { _id: "srv-4", title: "Cybersecurity", description: "Penetration testing, code hardening, zero-trust security audits, and real-time threat detection.", icon: "shield-lock", order: 4 },
  { _id: "srv-5", title: "SaaS Platforms", description: "Multi-tenant SaaS products with recurring subscription billing, team RBAC, and analytics.", icon: "cloud", order: 5 },
  { _id: "srv-6", title: "Workflow Automation", description: "Custom API integrations, background ETL data pipelines, and business process automation.", icon: "refresh", order: 6 },
];

export async function getServices(req, res) {
  try {
    if (isConnected) {
      let services = await Service.find().sort({ order: 1 });
      if (!services || services.length === 0) {
        services = await Service.insertMany(defaultServices);
      }
      return res.json({ success: true, data: services });
    }
    return res.json({ success: true, data: defaultServices });
  } catch (err) {
    return res.json({ success: true, data: defaultServices });
  }
}

