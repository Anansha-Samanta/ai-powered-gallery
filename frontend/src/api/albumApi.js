const BASE = "http://localhost:5000/api/albums";
const getUserId = () => localStorage.getItem("userId");

export const fetchAlbums = async () => {
  const userId = getUserId();
  const res = await fetch(`${BASE}?userId=${userId}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch albums");
  }
  return res.json();
};

export const fetchAlbum = async (id) => {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch album");
  }
  return res.json();
};

export const createAlbum = async ({ title, imageIds }) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      imageIds,
      userId: getUserId()
    })
  });
  if (!res.ok) {
    const err = await res.json();
    console.error("Server error:", err);
    throw new Error(err.message || "Failed to create album");
  }
  return res.json();
};

export const updateAlbum = async (id, { title, addImageIds, removeImageIds }) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, addImageIds, removeImageIds })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update album");
  }
  return res.json();
};

export const deleteAlbum = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete album");
  }
  return res.json();
};

export const fetchMyImages = async () => {
  const userId = getUserId();
  if (!userId) throw new Error("No userId in localStorage");
  const res = await fetch(`http://localhost:5000/api/images/${userId}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch images");
  }
  return res.json();
};