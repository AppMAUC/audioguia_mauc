import Card from '../../components/data_display/Cards';
import styles from './Admin.module.css';
import Vite from '/vite.svg';

const AdminHome = () => {

    return (
        <div className={styles.container}>
            <Card link={"/admin/dashboard"}>
                <Card.Image src={Vite} alt={"vite"} />
                <Card.Title>
                    Administradores
                </Card.Title>
                <Card.Description>
                    Gerenciar Administradores
                </Card.Description>
            </Card>
            <Card link={"/admin/timeline"}>
                <Card.Image src={Vite} alt={"vite"} />
                <Card.Title>
                    TimeLine
                </Card.Title>
                <Card.Description>
                    Gerenciar Linha do Tempo
                </Card.Description>
            </Card>
            <Card link={"/admin/artists"}>
                <Card.Image src={Vite} alt={"vite"} />
                <Card.Title>
                    Artistas
                </Card.Title>
                <Card.Description>
                    Gerenciar Artistas
                </Card.Description>
            </Card>
            <Card link={"/admin/artworks"}>
                <Card.Image src={Vite} alt={"vite"} />
                <Card.Title>
                    Obras
                </Card.Title>
                <Card.Description>
                    Gerenciar Obras
                </Card.Description>
            </Card>
            <Card link={"/admin/expositions"}>
                <Card.Image src={Vite} alt={"vite"} />
                <Card.Title>
                    Exposições
                </Card.Title>
                <Card.Description>
                    Gerenciar Exposições
                </Card.Description>
            </Card>
        </div>
    )
}

export default AdminHome