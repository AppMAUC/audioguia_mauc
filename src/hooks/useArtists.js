import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtistDetails, getArtists } from "../slices/artistSlice";

export const useArtists = (id = '') => {

    const dispatch = useDispatch();
    const { artists, artist, loading, error, message} = useSelector((state) => state.artist);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    useEffect(() => {
        if (id != '') {
            dispatch(getArtistDetails(id));
        }
    }, [id]);


    return { artists, artist, loading, error, message };
};
