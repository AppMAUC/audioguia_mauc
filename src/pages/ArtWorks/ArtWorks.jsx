import styles from '../Admin/Expositions/ExpositionDashboard.module.css'
import Card from '../../components/data_display/Cards';
import { uploads } from '../../utils/config';
import { useArtWorks } from '../../hooks/useArtWorks';

const ArtWorks = () => {

    const { artWorks, loading } = useArtWorks();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    Obras de Arte
                </h2>
            </div>
            <hr className={styles.hr} />
            <div className={styles.body}>
                {artWorks?.length > 0 &&
                    artWorks.map((item) => (
                        <Card link={`/artworks/${item._id}`} key={item._id}>
                            <Card.Image src={`${uploads}/images/artworks/${item.image}`} alt={item.title} />
                            <Card.Title>
                                {item.title}
                            </Card.Title>
                            <Card.Description>
                                {item.partial_desc}
                            </Card.Description>
                        </Card>
                    ))
                }

            </div>
        </div>
    )

}

export default ArtWorks