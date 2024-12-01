import {
  createContext,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Admin } from "../types/Admin";
import { api } from "../../../services/api";
import { requestConfig } from "../../../services/api/config";
import { AdminLogin } from "../types/Admin";

type requestError = {
  response: any;
  statusCode: number;
  message: string;
};

type AuthContext = {
  token?: string | null;
  currentAdmin?: Admin | null;
  auth: boolean | null;
  loading: boolean;
  error: requestError | null;
  login: (data: AdminLogin) => Promise<boolean | undefined>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<requestError | null>(null);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const localToken = localStorage.getItem("token");

        if (localToken && localToken != "undefined") {
          setToken(localToken);
        } else {
          setToken(null);
          setCurrentAdmin(null);
        }
      } catch (error) {
        console.log(error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchCurrentAdmin();
    }
  }, [token]);

  const fetchCurrentAdmin = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/profile", requestConfig());
      setAuth(true);
      setCurrentAdmin(response.data.data);
    } catch (error) {
      setError(error as requestError);
      setCurrentAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (!(config as any)._retry && token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.withCredentials = true;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const localToken = localStorage.getItem("token");
        if (
          (error.response?.status === 401 || error.response?.status === 403) &&
          !originalRequest._retry &&
          !isRefreshing &&
          localToken
        ) {
          originalRequest._retry = true;
          setIsRefreshing(true);
          try {
            setLoading(true);
            const response = await api.post(
              "/admin/refresh-token",
              {},
              requestConfig(true)
            );
            setToken(response.data.token);
            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            originalRequest.withCredentials = true;
            setIsRefreshing(false);
            return api(originalRequest);
          } catch (error) {
            localStorage.removeItem("token");
            setError(error as requestError);
            setCurrentAdmin(null);
            setToken(null);
            setIsRefreshing(false);
          } finally {
            setLoading(false);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [isRefreshing]);

  async function login(data: AdminLogin) {
    try {
      setLoading(true);
      const response = await api.post("/admin/login", data, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setAuth(true);
      setError(null);
      return true;
    } catch (error) {
      setAuth(false);
      setError(error as requestError);
      setToken(null);
      setCurrentAdmin(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      const response = await api.post("/admin/logout");
      if (response.status === 204) {
        localStorage.removeItem("token");
        setToken(null);
        setAuth(false);
        setCurrentAdmin(null);
      }
    } catch (error) {
      console.log(error);
      setToken(null);
      setAuth(null);
      setCurrentAdmin(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        auth,
        currentAdmin,
        token,
        error,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
