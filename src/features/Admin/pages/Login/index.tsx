import styles from "./Login.module.css";
// Components
import Message from "../../../../components/ui/Feedback/Message";
// Hooks
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LineElement,
  MaucLogo,
  PPCALogo,
  ProcultLogo,
} from "../../../../assets";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { AdminLogin } from "../../types/Admin";

const loginSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(5, "Senha deve ter no mínimo 5 caracteres"),
});

const Login = () => {
  const { login, loading, error, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/admin/dashboard");
    }
  }, [auth, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(loginSchema),
  });

  const loginAdmin = async ({ email, password }: AdminLogin) => {
    const admin = {
      email,
      password,
    };

    // await login(admin);
    const res = await login(admin);
    if (res) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.inner}>
          <NavLink to={"/"}>
            <MaucLogo className={styles.mauc} />
          </NavLink>
          <h2 className={styles.h2}>Administrador</h2>
          <div className={styles.login}>
            <LineElement />
            <p className={styles.p}>Login</p>
            <LineElement />
          </div>
          <form onSubmit={handleSubmit(loginAdmin)} className={styles.form}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <input type="email" required {...register("email")} />
            {errors.email && (
              <Message msg={errors.email?.message} type={"error"} />
            )}
            <label className={styles.label} htmlFor="password">
              Insira sua senha
            </label>
            <input
              {...register("password")}
              placeholder=""
              type="password"
              required
            />
            {errors.password && (
              <Message msg={errors.password?.message} type={"error"} />
            )}
            {!loading && <input type="submit" value="Entrar" />}
            {loading && <input type="submit" value="Entrar" disabled />}
            {error && (
              <Message msg={error?.response?.data?.message} type={"error"} />
            )}
          </form>
        </div>
      </section>
      <footer className={styles.footer}>
        <ProcultLogo style={{ width: "40%", height: "40%" }} />
        <PPCALogo style={{ width: "50%", height: "40%" }} />
      </footer>
    </div>
  );
};

export default Login;
