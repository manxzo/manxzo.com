import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Token management
export const setToken = (token: string) => {
  localStorage.setItem("adminToken", token);
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken");
  }
  return null;
};

export const removeToken = () => {
  localStorage.removeItem("adminToken");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
