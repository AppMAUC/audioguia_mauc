import './Auth.css';

// Components
import { Link } from 'react-router-dom';
import Message from '../../components/feedback/Message';

// Hooks
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { uploads } from '../../utils/config';
// Redux
import { register, reset } from '../../slices/authSlice';

const Register = () => {

  const [previewImage, setPreviewImage] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const [formValues, handleInputChange, handleSet, handleChangeFile, handleSubmit] = useForm({
    name: '',
    image: '',
    email: '',
    password: '',
    confirmPassword: '',
    accessLevel: '2',
  });

  return (
    <div id='register'>
      <h2>Administrador</h2>
      {(formValues.image || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage || `${uploads}/images/admin/${formValues.image}`
          }
          alt={formValues?.name}
        />
      )}
      <p className="subtitle">Caso seja um administrador do projeto, cadastre-se.</p>
      <form onSubmit={(e) => handleSubmit(e, register, reset, '/', error)}>
        <input
          type="text"
          name="name"
          placeholder='Nome'
          onChange={handleInputChange}
          value={formValues.name || ''}
          required
        />
        <label>
          <span>Imagem do Perfil:</span>
          <input type="file" name='image' onChange={(e) => { setPreviewImage(URL.createObjectURL(e.target.files[0])); handleChangeFile(e) }} />
        </label>
        <input
          type="email"
          name='email'
          placeholder='Email'
          onChange={handleInputChange}
          value={formValues.email || ''}
          required
        />
        <input
          type="password"
          name='password'
          placeholder='Senha'
          onChange={handleInputChange}
          value={formValues.password || ''}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder='Confirme a senha'
          onChange={handleInputChange}
          value={formValues.confirmPassword || ''}
          required
        />
        <p>Escolha o nível de acesso do novo administrador:</p>
        <select name='accessLevel' defaultValue="1" onChange={handleInputChange}>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Cadastrar" disabled />}
        {error && <Message msg={error} type={"error"} />}
      </form>
    </div>
  )
}

export default Register