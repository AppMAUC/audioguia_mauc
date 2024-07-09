import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {

    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token, admin } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token === true && admin) {
            setAuth(true);
        } else {
            setAuth(false);
        }

        setLoading(false);
    }, [admin]);

    return { auth, loading };
};
