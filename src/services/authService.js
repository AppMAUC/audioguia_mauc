import { api, requestConfig } from '../utils/config';

const route = "admin";

// Register an admin
const register = async (data) => {

    const config = requestConfig("POST", data, null, true);

    try {
        console.log(config);
        const res = await fetch(api + `/${route}/register`, config)
            .then((res) => res.json())
            .catch((err) => err);

        if (res._id) {
            localStorage.setItem("admin", JSON.stringify({ ...res, "isValid": true })); // Modificar a linha para que o novo administrador não seja logado
        };

        return res;
    } catch (error) {
        console.log(error);
    };

};

// Sign in
const login = async (data) => {

    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + `/${route}/login`, config).then((res) => res.json()).catch((err) => err.message);

        if (res._id) {
            localStorage.setItem("admin", JSON.stringify({ ...res, "isValid": true }));
        } else if (res == "Failed to fetch") {
            return { errors: ["Erro de conexão com o servidor, tente novamente mais tarde."] };
        };

        return res;
    } catch (error) {
        console.log(error);
    };

}

// Logout
const logout = () => {
    localStorage.removeItem("admin");
};

const verifyToken = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + `/${route}/token`, config).then((res) => res.json()).catch((err) => err);

        if (res.errors) {
            return false
        }

        return res.token;
    } catch (error) {
        console.log(error);
    };
};



const authService = {
    register,
    login,
    logout,
    verifyToken
};

export default authService;