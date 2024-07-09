import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTimeLineDetails, getTimeLines } from "../slices/timeLineSlice";

const useTimeLines = (id = '') => {

    const dispatch = useDispatch();
    const { timeLines, timeLine, loading, error, message} = useSelector((state) => state.timeLine);

    useEffect(() => {
        dispatch(getTimeLines());
    }, [dispatch]);

    useEffect(() => {
        if (id != '') {
            dispatch(getTimeLineDetails(id));
        }
    }, [id]);


    return { timeLines, timeLine, loading, error, message };
};

export default useTimeLines;