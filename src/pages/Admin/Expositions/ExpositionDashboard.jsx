import Card from '../../../components/data_display/Cards';
import styles, {button, _red} from './ExpositionDashboard.module.css'
import { useNavigate } from 'react-router-dom';

const ExpositionDashboard = () => {

  const navigate = useNavigate()


  const handleRedirect = (e) => {
    e.preventDefault();
    navigate("/admin/register")
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Exposições
        </h2>
        <button onClick={handleRedirect} className={`${button} ${_red}`}>
          Adicionar Exposição
        </button>
      </div>
      <hr className={styles.hr} />
      <div className={styles.body}>
        <Card link={'/'}>
          <Card.Image src={"/vite.svg"} alt={'vite'} />
          <Card.Title>
            Expo 1
          </Card.Title>
          <Card.Description>
            Imagem react
          </Card.Description>
        </Card>
      </div>
    </div>
  )
}

export default ExpositionDashboard