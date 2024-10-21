import {createContext, useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const AuthContext = createContext<any>(null);

export function AuthContextProvider({children}: { children: React.ReactNode }) {
  const auth = getAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, []);

  const values = {
    user,
    setUser,
  }

  return (
    <AuthContext.Provider value={values}>
      {!loading &&
        children
      }
    </AuthContext.Provider>
  );
}
