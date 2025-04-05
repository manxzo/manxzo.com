import { getToken } from "./auth";
export const adminFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  const body =
    typeof options.body === "string"
      ? options.body
      : JSON.stringify(options.body);
  const method = options.method;
  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
