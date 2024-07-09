import { api, requestConfig } from '../utils/config';

const route = "artists";

const registerArtist = async (data, token) => {

    const config = requestConfig("POST", data, token, true);

    try {
        const res = await fetch(api + `/${route}/` , config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    };

};

const updateArtist = async (id, data, token) => {

    const config = requestConfig("PUT", data, token, true);

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

const deleteArtist= async (id, token) => {

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

const getArtists = async () => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/`, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    };
};


const getArtistById = async (id) => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

const searchArtists = async (query) => {

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



const artistsService = {
    registerArtist,
    updateArtist,
    deleteArtist,
    getArtists,
    getArtistById,
    searchArtists
};

export default artistsService;