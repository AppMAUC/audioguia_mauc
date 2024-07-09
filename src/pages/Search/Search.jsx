import { useEffect } from "react"
import { useDispatch } from "react-redux"
import useQuery from "../../hooks/useQuery"
import { uploads } from "../../utils/config"
import { searchArtWorks } from "../../slices/artWorkSlice"
import { useArtWorks } from "../../hooks/useArtWorks"
import Card from '../../components/data_display/Cards';

const Search = () => {

    const query = useQuery();
    const search = query.get("q");

    const dispatch = useDispatch();

    const { artWorks, loading } = useArtWorks();

    useEffect(() => {
        dispatch(searchArtWorks(search));
    }, [dispatch, search]);

    return (
        <div id="search">
            <h2>Você está buscando por: {search}</h2>
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
    )
}

export default Search;