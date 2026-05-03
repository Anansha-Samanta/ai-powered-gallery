const BASE = `${import.meta.env.VITE_API_URL}/api/collages`;

export const createCollage = async ({ userId, title, photos }) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title, photos }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to save collage");
  return data;
};

// matches GET /api/collages?userId=xxx  (same pattern as albumApi)
export const getUserCollages = async (userId) => {
  const res = await fetch(`${BASE}?userId=${userId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch collages");
  return data;
};

export const deleteCollage = async (id) => {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete collage");
  return data;
};

export const updateCollage = async (id, updates) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update collage");
  return data;
};

