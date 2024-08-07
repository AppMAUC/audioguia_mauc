import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getArtWorkDetails, getArtWorks, resetArtWork, updateArtWork } from "../slices/artWorkSlice";

export const useArtWorks = (id = '') => {

    const { artWorks, artWork, loading, error, message } = useSelector((state) => state.artWork);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtWorks());
    }, [dispatch]);

    useEffect(() => {
        if (id != '') {
            dispatch(getArtWorkDetails(id));
        }
    }, [id]);

    return {
        artWorks,
        artWork,
        loading,
        error,
        message,
        update: (data) => dispatch(updateArtWork(data)),
        get: (id) => dispatch(getArtWorkDetails(id))
    };
};
