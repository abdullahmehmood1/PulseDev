import Contact from "../models/Contact.js";
import { isConnected } from "../config/db.js";

const inMemoryContacts = [
  {
    _id: "cnt-101",
    name: "Eleanor Vance",
    email: "eleanor@fintechlead.com",
    message: "[BOOKING CONSULTATION]\nService Interested: WEB DEVELOPMENT\nBudget Range: $25,000 - $50,000\nPhone: +1 (555) 392-1049\nPreferred Date: Next Wednesday 3:00 PM EST\n\nProject Details:\nWe need a high-frequency trading analytics dashboard with real-time web socket data feeds.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: "cnt-102",
    name: "David Sterling",
    email: "david@healthstack.io",
    message: "Interested in security audit and SOC2 compliance hardening for our patient data API.",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export async function createContact(req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are all required." });
    }

    if (isConnected) {
      const contact = await Contact.create({ name, email, message });
      return res.status(201).json({ success: true, data: contact });
    } else {
      const newEntry = {
        _id: `cnt-${Date.now()}`,
        name,
        email,
        message,
        status: "new",
        createdAt: new Date().toISOString(),
      };
      inMemoryContacts.unshift(newEntry);
      return res.status(201).json({ success: true, data: newEntry });
    }
  } catch (err) {
    return res.status(500).json({ error: "Could not save your message. Please try again." });
  }
}

export async function getContacts(req, res) {
  try {
    if (isConnected) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: contacts });
    } else {
      return res.json({ success: true, data: inMemoryContacts });
    }
  } catch (err) {
    return res.json({ success: true, data: inMemoryContacts });
  }
}

export async function updateContactStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (isConnected) {
      const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });
      if (!contact) return res.status(404).json({ error: "Message not found." });
      return res.json({ success: true, data: contact });
    } else {
      const item = inMemoryContacts.find((c) => c._id === id);
      if (item) {
        item.status = status;
        return res.json({ success: true, data: item });
      }
      return res.status(404).json({ error: "Message not found." });
    }
  } catch (err) {
    return res.status(500).json({ error: "Could not update message status." });
  }
}

