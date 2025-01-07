import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);

        let user = JSON.parse(localStorage.getItem("user") || "null");

        if (user) {
          dispatch({ type: "LOGIN", payload: user });
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user: state.user, dispatch, isLoading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContextProvider, AuthContext };
