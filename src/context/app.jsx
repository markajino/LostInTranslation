import { createContext, useCallback, useEffect, useState } from "react";
import { getLoggedInUser, useLoggedIn } from "../auth";
import { Translation } from "../api/translations";

export const AuthContext = createContext({
  currentUser: null,
  isLoggedIn: false,
  translations: [],
  translationsHandler: (translations) => {},
});

export const AuthContextProvider = ({ children }) => {
  const hasToken = useLoggedIn();

  const [currentUser, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [translations, setTranslations] = useState([]);

  const fetchUser = useCallback(async () => {
    const user = getLoggedInUser();
    if (user) {
      const parsedUser = JSON.parse(user);
      const { id, username } = parsedUser || {};
      const response = await Translation.getUserTranslations(username);
      const { data } = response;
      const { translations } = data[0] || {};
      translations && setTranslations(translations);
      id && setUser({ id, username });
    }
  }, []);

  const translationsHandler = (t) => setTranslations(t);

  useEffect(() => {
    hasToken && setIsLoggedIn(true);
    hasToken && isLoggedIn && fetchUser();
  }, [fetchUser, hasToken, isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        translations,
        translationsHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
