import { api, requestConfig } from '../utils/config';

const route = "expositions";

const registerExposition = async (data, token) => {

    const config = requestConfig("POST", data, token);

    try {
        const res = await fetch(api + `/${route}/` , config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    };

};

const updateExposition = async (id, data, token) => {

    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

const deleteExposition= async (id, token) => {

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

const getExpositions = async () => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/`, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    };
};


const getExpositionById = async (id) => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

const searchExpositions = async (query) => {

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



const expositionService = {
    registerExposition,
    updateExposition,
    deleteExposition,
    getExpositions,
    getExpositionById,
    searchExpositions
};

export default expositionService;