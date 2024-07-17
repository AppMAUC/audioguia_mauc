import './AdminProfile.css';

import { uploads } from '../../../utils/config';

// Hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useForm from '../../../hooks/useForm';

// Redux
import { profile, resetMessage, updateProfile } from '../../../slices/adminSlice';

// Components
import Message from '../../../components/feedback/Message';

const AdminProfile = () => {
  const dispatch = useDispatch();

  const { admin, message, error, loading } = useSelector((state) => state.admin);

  const [formValues, handleInputChange, handleSet, handleChangeFile] = useForm({});

  const [previewImage, setPreviewImage] = useState("");

  // Load admin data
  useEffect(() => {
    dispatch(profile());
    
  }, [dispatch]);

  // fill form with admin data
  useEffect(() => {
    if (admin) {
      const { password, ...data } = admin;
      handleSet(data);
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather admin data from states

    if (formValues.password === "") {
      delete formValues.password;
    };

    const adminData = {
      ...formValues
    };

    // build form data
    const formData = new FormData();

    Object.keys(adminData).forEach((key) => {
      formData.append(key, adminData[key])
    });

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);

  };

  return (
    <div className='edit-profile'>
      <h2>Edite seus dados</h2>
      <p className='subtitle'> Adicionar uma imagem de perfil</p>
      {(admin.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage || `${uploads}/images/admin/${admin.profileImage}`
          }
          alt={admin.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Nome'
          name='name'
          onChange={handleInputChange}
          value={formValues.name || ""}
        />
        <input
          type="email"
          placeholder='Email'
          name='email'
          disabled
          value={formValues.email || ""}
        />
        <label>
          <span>Imagem do Perfil:</span>
          <input type="file" name='profileImage' onChange={(e) => { setPreviewImage(URL.createObjectURL(e.target.files[0])); handleChangeFile(e) }} />
        </label>
        <label>
          <span>Quer alterar a sua senha?</span>
          <input
            type="password"
            name='password'
            placeholder='Digite sua nova senha'
            onChange={handleInputChange}
            value={formValues.password || ""}
          />
        </label>
        <select name='accessLevel' onChange={handleInputChange} disabled>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type={"error"} />}
        {message && <Message msg={message} type={"success"} />}
      </form>
    </div>
  )
};

export default AdminProfile;