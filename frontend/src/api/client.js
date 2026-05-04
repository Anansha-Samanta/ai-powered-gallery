export const apiFetch = (path, options = {}) => {
  const isFormData = options.body instanceof FormData;
  return fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      "ngrok-skip-browser-warning": "true",
      ...options.headers,
    },
  });
};