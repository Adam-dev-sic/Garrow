const API_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });

  const data = await res.json(); // parse JSON once

  if (!res.ok) {
    throw new Error(data.message || "Unknown error");
  }

  return data;
};
