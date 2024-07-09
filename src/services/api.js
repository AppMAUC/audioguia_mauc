import { api, requestConfig } from '../utils/config';


const apiService = (route, file) => {

    const register = async (data, token) => {

        const config = requestConfig("POST", data, token, file);

        try {
            const res = await fetch(api + `/${route}/`, config)
                .then((res) => res.json())
                .catch((err) => err);

            return res;
        } catch (error) {
            console.log(error);
        };

    };

    const update = async (id, data, token) => {

        const config = requestConfig("PUT", data, token, file);

        try {
            const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
            return res;
        } catch (error) {
            console.log(error);
        }

    };



    const deleteById = async (id, token) => {

        const config = requestConfig("DELETE", null, token);

        try {
            const res = await fetch(api + `/${route}/` + id, config)
                .then((res) => res.json())
                .catch((err) => err);

            return res;
        } catch (error) {
            console.log(error);
        };

    };


    const getAll = async () => {
        const config = requestConfig("GET");

        try {
            const res = await fetch(api + `/${route}/`, config).then((res) => res.json()).catch((err) => err);
            return res;
        } catch (error) {
            console.log(error);
        };
    };


    const getById = async (id) => {
        const config = requestConfig("GET");

        try {
            const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
            return res;
        } catch (error) {
            console.log(error);
        }

    };

    const search = async (query) => {

        const config = requestConfig("GET");

        try {
            const res = await fetch(api + `/${route}/search?q=` + query, config)
                .then((res) => res.json())
                .catch((err) => err);

            return res
        } catch (error) {
            console.log(error)
        }

    }

    return {
        register,
        update,
        deleteById,
        getAll,
        getById,
        search
    }
}

export default apiService;