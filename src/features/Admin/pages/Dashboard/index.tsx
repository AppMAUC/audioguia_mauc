import styles from "./Dashboard.module.css";
import { Card, CardList } from "../../components/Card/Card";
import Content from "../../components/Content";
import { Image1, Image2, Image3, Image4, Image5 } from "../../../../assets";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { currentAdmin } = useAuth();
  const images = [
    {
      id: "1",
      image: Image1,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: "2",
      image: Image2,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: "3",
      image: Image3,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: "4",
      image: Image4,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
    {
      id: "5",
      image: Image5,
      author: "L. Da Vinci",
      dateEnds: "30/12/2021",
      title: "Ariana",
    },
  ];

  return (
    <div className={styles.container}>
      <Content>
        <Content.Title>Artistas</Content.Title>
        <CardList>
          {images.slice(0, 3).map((image) => (
            <Card link={`/admin/artist/${image.id}`} key={image.id}>
              <Card.Info>
                <Card.Title>{image.title}</Card.Title>
              </Card.Info>
              <Card.Image src={image.image} alt="Testando" />
            </Card>
          ))}
          <Card.Div>
            <Card.Add link={`/admin/artists/new`} />
            <Card.Button link={`/admin/artists`}>
              <Card.Edit>Editar Artistas</Card.Edit>
            </Card.Button>
          </Card.Div>
        </CardList>
      </Content>
      <Content>
        <Content.Title>Exposições</Content.Title>
        <CardList>
          {images.slice(2, 5).map((image) => (
            <Card link={`/admin/exposition/${image.id}`} key={image.id}>
              <Card.Info>
                <Card.Title>{image.title}</Card.Title>
                <Card.Subtitle2>{image.dateEnds.split("/")[2]}</Card.Subtitle2>
              </Card.Info>
              <Card.Image src={image.image} alt="Testando" />
            </Card>
          ))}
          <Card.Div>
            <Card.Add link={`/admin/expositions/new`} />
            <Card.Button link={`/admin/expositions`}>
              <Card.Edit>Editar Exposições</Card.Edit>
            </Card.Button>
          </Card.Div>
        </CardList>
      </Content>
      <Content>
        <Content.Title>Obras</Content.Title>
        <CardList>
          {images.slice(0, 3).map((image) => (
            <Card link={`/admin/artwork${image.id}`} key={image.id}>
              <Card.Info>
                <Card.Title>{image.title}</Card.Title>
                <Card.Subtitle2>{image.dateEnds.split("/")[2]}</Card.Subtitle2>
              </Card.Info>
              <Card.Image src={image.image} alt="Testando" />
            </Card>
          ))}
          <Card.Div>
            <Card.Add link={`/admin/artworks/new`} />
            <Card.Button link={`/admin/artworks`}>
              <Card.Edit>Editar Obrass</Card.Edit>
            </Card.Button>
          </Card.Div>
        </CardList>
      </Content>
      <Content>
        <Content.Title>Linha do Tempo</Content.Title>
        <CardList>
          {images.slice(0, 3).map((image) => (
            <Card link={`/admin/timeline/${image.id}`} key={image.id}>
              <Card.Info>
                <Card.Title>{image.title}</Card.Title>
                <Card.Subtitle2>{image.dateEnds.split("/")[2]}</Card.Subtitle2>
              </Card.Info>
              <Card.Image src={image.image} alt="Testando" />
            </Card>
          ))}
          <Card.Div>
            <Card.Add link={`/admin/timelines/new`} />
            <Card.Button link={`/admin/timelines`}>
              <Card.Edit>Editar Linha do tempo</Card.Edit>
            </Card.Button>
          </Card.Div>
        </CardList>
      </Content>
      {currentAdmin?.accessLevel === 2 && (
        <Content>
          <Content.Title>Administradores</Content.Title>
          <CardList>
            {images.slice(0, 3).map((image) => (
              <Card link={`/admin/profile/${image.id}`} key={image.id}>
                <Card.Info>
                  <Card.Title>{image.title}</Card.Title>
                  <Card.Subtitle2>email@gmail.com</Card.Subtitle2>
                </Card.Info>
                <Card.Image src={image.image} alt="Testando" />
              </Card>
            ))}
            <Card.Div>
              <Card.Add link={`/admin/register`} />
              <Card.Button link={`/admin/all`}>
                <Card.Edit>Editar Administradores</Card.Edit>
              </Card.Button>
            </Card.Div>
          </CardList>
        </Content>
      )}
    </div>
  );
};

export default Dashboard;
