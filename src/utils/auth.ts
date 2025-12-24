export const getCurrentUser = () => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getUserId = (): string | null => {
  const user = getCurrentUser();
  return user?.id ?? null;
};
