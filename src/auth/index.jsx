export const isLoggedIn = () => !!localStorage.getItem("access_token");
export const useLoggedIn = () => !!localStorage.getItem("access_token");
export const getLoggedInUser = () => localStorage.getItem("access_token");
export const logOut = () => localStorage.removeItem("access_token");
export const setToken = (token) => localStorage.setItem("access_token", token);
