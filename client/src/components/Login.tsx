import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../context/appContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { getCurrentUser } from "../api/userApi";
import { submitAuth, type AuthMode } from "../api/authApi";
import { setAuthToken } from "../api/apiClient";
import { getErrorMessage } from "../api/getErrorMessage";
import { authScopedQueryKeys, queryKeys } from "../queries/queryKeys";

const Login = () => {
  const { setShowLogin, setToken, navigate, setUser, setIsOwner } =
    useAppContext();
  const queryClient = useQueryClient();

  const [state, setState] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = await submitAuth(state, {
        name,
        email,
        password,
      });

      if (data.success) {
        authScopedQueryKeys.forEach((queryKey) => {
          queryClient.removeQueries({ queryKey });
        });

        localStorage.setItem("token", data.token);
        setAuthToken(data.token);
        setToken(data.token);

        const userData = await queryClient.fetchQuery({
          queryKey: queryKeys.currentUser,
          queryFn: getCurrentUser,
        });

        if (userData.success) {
          setUser(userData.user);
          setIsOwner(userData.user.role === "owner");
        }

        setShowLogin(false);
        navigate("/");
        toast.success("Login successful!");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col gap-6 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-2xl shadow-lg shadow-white/40 bg-black"
      >
        <p className="text-2xl font-medium m-auto text-white/80">
          <span className="text-white/80">{t("login.user")}</span>{" "}
          {state === "login" ? `${t("login.login")}` : `${t("login.signUp")}`}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p className="text-white/80">{t("login.name")}</p>
            <input
              onChange={(event) => setName(event.target.value)}
              value={name}
              placeholder=""
              className="shadow-md shadow-white/40 rounded w-full p-2 mt-1 outline-none text-white"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p className="text-white/80">{t("login.email")}</p>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            placeholder=""
            className="shadow-md shadow-white/40 rounded w-full p-2 mt-1 outline-none text-white"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p className="text-white/80">{t("login.password")}</p>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            placeholder=""
            className="shadow-md shadow-white/40 rounded w-full p-2 mt-1 outline-none text-white"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p className="text-white/70">
            {t("login.already")}{" "}
            <span
              onClick={() => setState("login")}
              className="text-purple-400 cursor-pointer"
            >
              {t("login.click")}
            </span>
          </p>
        ) : (
          <p className="text-white/70">
            {t("login.create")}{" "}
            <span
              onClick={() => setState("register")}
              className="text-purple-400 cursor-pointer"
            >
              {t("login.click")}
            </span>
          </p>
        )}
        <button className="px-1 w-full sm:px-4 py-2 text-xs md:text-sm font-medium text-gray-200 rounded-2xl shadow-sm shadow-white cursor-pointer hover:scale-105 transition-all duration-300">
          {state === "register"
            ? `${t("login.createButton")}`
            : `${t("login.loginButton")}`}
        </button>
      </form>
    </div>
  );
};

export default Login;
