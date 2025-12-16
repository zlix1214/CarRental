import React from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate, setUser, setIsOwner } =
    useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { t } = useTranslation();

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        // 先設置 token 到 localStorage 和 axios headers
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `${data.token}`;

        // 然後更新 state
        setToken(data.token);

        // 手動獲取用戶數據
        const userData = await axios.get("/api/user/data");
        if (userData.data.success) {
          setUser(userData.data.user);
          setIsOwner(userData.data.user.role === "owner");
        }

        setShowLogin(false);
        navigate("/");
        toast.success("Login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
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
              onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
