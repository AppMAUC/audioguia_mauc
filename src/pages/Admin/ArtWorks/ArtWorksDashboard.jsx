import { useArtWorks } from '../../../hooks/useArtWorks.js'
import styles from '../Expositions/ExpositionDashboard.module.css'
import { uploads } from '../../../utils/config';
import Card from '../../../components/data_display/Cards';
import { useNavigate } from 'react-router-dom';
import Message from '../../../components/feedback/Message.jsx';
const ArtWorksDashboard = () => {

  const { artWorks, artWork, loading, message } = useArtWorks();
  const navigate = useNavigate()


  const handleRedirect = (e) => {
    e.preventDefault();
    navigate('/admin/artworks/register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Obras de Arte
        </h2>
        <button onClick={handleRedirect} className={styles.button}>
          Adicionar Exposição
        </button>
      </div>
      <hr className={styles.hr} />
      <div className={styles.body}>
        {artWorks.data?.length > 0 &&
          artWorks.data.map((item) => (
            <Card link={`/admin/artworks/${item._id}`} key={item._id}>
              <Card.Image src={item.image.url} alt={item.title} />
              <Card.Title>
                {item.title}
              </Card.Title>
              <Card.Description>
                {item.desc}
              </Card.Description>
            </Card>
          ))
        }

      </div>
    </div>
  )
}

export default ArtWorksDashboard