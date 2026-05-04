export const apiFetch = (path, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const token = localStorage.getItem("token");
  const base = import.meta.env.VITE_API_URL.replace(/\/$/, ""); // strip trailing slash

  return fetch(`${base}${path}`, {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      "ngrok-skip-browser-warning": "true",
      ...(token && { "Authorization": `Bearer ${token}` }),
      ...options.headers,
    },
  });
};