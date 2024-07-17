import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getArtWorkDetails, getArtWorks } from "../slices/artWorkSlice";

export const useArtWorks = (id = '') => {

    const dispatch = useDispatch();
    const { artWorks, artWork, loading, error, message} = useSelector((state) => state.artWork);

    useEffect(() => {
        dispatch(getArtWorks());
    }, [dispatch]);

    useEffect(() => {
        if (id != '') {
            dispatch(getArtWorkDetails(id));
        }
    }, [id]);

    return { artWorks, artWork, loading, error, message };
};
