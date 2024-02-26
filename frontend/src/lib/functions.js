export const handleLoginWithGithub = () => {
  window.open(`${import.meta.env.VITE_HOST_URL}/api/auth/github`, "_self");
};
