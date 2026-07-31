import { supabase } from "../lib/supabaseClient";

export const getServices = async () => [];
export const getProjects = async (limit = null) => {
  try {
    let query = supabase.from('projects').select('*').order('sort_order', { ascending: true });
    
    if (limit) {
      query = query.eq('is_featured', true).limit(limit);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    
    return { data };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { data: [] };
  }
};

export const getProjectById = async (id) => {
  try {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (error) throw error;
    return { data };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { data: null };
  }
};

export const addProject = async (payload) => {
  const { error } = await supabase.from('projects').insert([payload]);
  if (error) throw error;
  return { success: true };
};

export const deleteProject = async (id) => {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
  return { success: true };
};

export const sendContactMessage = async (payload) => {
  try {
    let rowData = {
      source: "contact",
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      company: payload.company || null,
      service: payload.service || null,
      budget: payload.budget || null,
      preferred_date: payload.preferredDate || null,
      message: payload.message,
    };

    if (payload.message && payload.message.startsWith("[BOOKING CONSULTATION]")) {
      rowData.source = "booking";
      
      const serviceMatch = payload.message.match(/Service: (.*)/);
      const budgetMatch = payload.message.match(/Budget: (.*)/);
      const phoneMatch = payload.message.match(/Phone: (.*)/);
      const dateMatch = payload.message.match(/Preferred Date: (.*)/);
      const detailsMatch = payload.message.match(/Project Details:\r?\n([\s\S]*)/);
      
      if (serviceMatch) rowData.service = serviceMatch[1].trim();
      if (budgetMatch) rowData.budget = budgetMatch[1].trim();
      if (phoneMatch && phoneMatch[1].trim() !== "Not provided") rowData.phone = phoneMatch[1].trim();
      if (dateMatch && dateMatch[1].trim() !== "ASAP") rowData.preferred_date = dateMatch[1].trim();
      if (detailsMatch) rowData.message = detailsMatch[1].trim();
    }
    
    const { error } = await supabase.from('submissions').insert([rowData]);
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    return Promise.reject({ error: error.message });
  }
};

const api = {
  get: async (url) => {
    if (url === "/contact") {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return { data: { data } };
    }
    return { data: [] };
  },
  patch: async (url, payload) => {
    const match = url.match(/\/contact\/(.+)\/status/);
    if (match) {
      const id = match[1];
      const { error } = await supabase
        .from('submissions')
        .update({ status: payload.status })
        .eq('id', id);
      if (error) throw error;
      return { data: { success: true } };
    }
    throw new Error("Invalid URL");
  }
};

export default api;
