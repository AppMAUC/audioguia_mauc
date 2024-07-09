import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getExpositionDetails, getExpositions } from "../slices/expositionSlice";

const useExpositions = (id = '') => {

    const dispatch = useDispatch();
    const { expositions, exposition, loading, error, message} = useSelector((state) => state.exposition);

    useEffect(() => {
        dispatch(getExpositions());
    }, [dispatch]);

    useEffect(() => {
        if (id != '') {
            dispatch(getExpositionDetails(id));
        }
    }, [id]);


    return { expositions, exposition, loading, error, message };
};

export default useExpositions;