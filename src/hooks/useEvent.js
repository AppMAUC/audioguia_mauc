import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetails, getEvents } from "../slices/eventSlice";

export const useEvent = (id = '') => {

    const dispatch = useDispatch();
    const { events, event, loading, error, message} = useSelector((state) => state.event);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    useEffect(() => {
        if (id != '') {
            dispatch(getEventDetails(id));
        }
    }, [id]);


    return { events, event, loading, error, message };
};
