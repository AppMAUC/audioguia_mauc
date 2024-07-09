import './Auth.css';

// Components
import { Link, Navigate } from 'react-router-dom';
import Message from '../../components/feedback/Message';

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Redux
import { login, reset } from '../../slices/authSlice';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);



  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = {
      email,
      password
    };


    dispatch(login(admin));

  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);



  return (
    <div id="login">
      <h2>AppMauc</h2>
      <p className="subtitle">Faça o login para administrar.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
          required
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Entrar" disabled />}
        {error && <Message msg={error} type={"error"} />}
      </form>
    </div>
  )
}

export default Login