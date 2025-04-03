import { getToken } from "./auth";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // If body is a string, parse it as JSON
  const body =
    typeof options.body === "string"
      ? options.body
      : JSON.stringify(options.body);

  const response = await fetch(url, {
    ...options,
    headers,
    body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};
