import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../slices/authSlice";

export const useAuth = () => {

    const dispatch = useDispatch();
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token, admin } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token === true && admin) {
           // dispatch(verifyToken());
            setAuth(token);
        } else {
            setAuth(false);
        }

        setLoading(false);
    }, [admin, token]);

    return { auth, loading };
};
