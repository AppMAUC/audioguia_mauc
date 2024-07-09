import './Auth.css';

// Components
import { Link } from 'react-router-dom';
import Message from '../../components/feedback/Message';

// Hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux
import { register, reset } from '../../slices/authSlice';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState(1);

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = {
      name,
      email,
      password,
      confirmPassword,
      accessLevel
    };
    
    dispatch(register(admin));
  };

  // Clear all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id='register'>
      <h2>Administrador</h2>
      <p className="subtitle">Caso seja um administrador do projeto, cadastre-se.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder='Nome'
          onChange={(e) => setName(e.target.value)}
          value={name || ''}
          required
        />
        <input
          type="email"
          name='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email || ''}
          required
        />
        <input
          type="password"
          name='password'
          placeholder='Senha'
          onChange={(e) => setPassword(e.target.value)}
          value={password || ''}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder='Confirme a senha'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ''}
          required
        />
        <p>Escolha o nível de acesso do novo administrador:</p>
        <select onChange={(e) => setAccessLevel(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Cadastrar" disabled />}
        {error && <Message msg={error} type={"error"}/>}
      </form>
    </div>
  )
}

export default Register