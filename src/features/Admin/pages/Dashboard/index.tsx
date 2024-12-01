import styles from "./Dashboard.module.css";
import { Card, CardList } from "../../components/Card/Card";
import Content from "../../components/Content";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ArtistService from "../../../Artists/api/ArtistService";
import { Artist } from "../../../Artists/types/Artist";
import ArtWorkService from "../../../ArtWorks/api/ArtWorkService";
import { ArtWork } from "../../../ArtWorks/types/ArtWork";
import AdminService from "../../api/AdminService";
import ExpositionService from "../../../Expositions/api/ExpositionService";
import { Exposition } from "../../../Expositions/types/Exposition";
import Mobile from "../../../../components/ui/Mobile";
import { useEffect } from "react";

const Dashboard = () => {
  const { currentAdmin } = useAuth();
  const {
    data: artists,
    isLoading: artistLoading,
    isError: artistError,
  } = useQuery({
    queryKey: ["artists/all"],
    queryFn: async () => await ArtistService.getAll<Artist>(),
  });

  const {
    data: expositions,
    isLoading: expositionLoading,
    isError: expositionError,
  } = useQuery({
    queryKey: ["expositions/all"],
    queryFn: async () => await ExpositionService.getAll<Exposition>(),
  });

  const {
    data: artWorks,
    isLoading: artWorkLoading,
    isError: artWorkError,
  } = useQuery({
    queryKey: ["artWorks/all"],
    queryFn: async () => await ArtWorkService.getAll<ArtWork>(),
  });

  const {
    data: admins,
    isLoading: adminLoading,
    isError: adminError,
  } = useQuery({
    queryKey: ["admins/all"],
    queryFn: async () => await AdminService.getAll(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (artistLoading || expositionLoading || artWorkLoading || adminLoading) {
    return <Mobile.Loading />;
  }

  if (artistError || expositionError || artWorkError || adminError) {
    return <Mobile.Error />;
  }

  return (
    <div className={styles.container}>
      <Content>
        <Content.Title>Artistas</Content.Title>
        <CardList>
          {artists?.data?.slice(0, 3).map((item) => (
            <Card link={`/admin/artists/${item._id}`} key={item._id}>
              <Card.Info>
                <Card.Title>{item.name}</Card.Title>
              </Card.Info>
              <Card.Image src={item.image.url} alt="Testando" />
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
          {expositions?.data?.slice(0, 3).map((item) => (
            <Card link={`/admin/expositions/${item._id}`} key={item._id}>
              <Card.Info>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle2>{item.dateEnds.split("/")[2]}</Card.Subtitle2>
              </Card.Info>
              <Card.Image src={item.image.url} alt="Testando" />
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
          {artWorks?.data?.slice(0, 3).map((item) => (
            <Card link={`/admin/artworks/${item._id}`} key={item._id}>
              <Card.Info>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle2>{item.year}</Card.Subtitle2>
              </Card.Info>
              <Card.Image src={item.image.url} alt="Testando" />
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
      {currentAdmin?.accessLevel === 1 && (
        <Content>
          <Content.Title>Administradores</Content.Title>
          <CardList>
            {admins?.slice(0, 3).map((item) => (
              <Card link={`/admin/profile/${item._id}`} key={item._id}>
                <Card.Info>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle2>{item.email}</Card.Subtitle2>
                </Card.Info>
                <Card.Image src={item.image.url} alt="Testando" />
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
