import { api, requestConfig } from '../utils/config';

const route = "artworks";


const registerArtWork = async (data, token) => {

    const config = requestConfig("POST", data, token, true);

    try {
        const res = await fetch(api + `/${route}/`, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    };

};

const updateArtWork = async (id, data, token) => {

    const config = requestConfig("PUT", data, token, true);

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

const deleteArtWork = async (id, token) => {

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

// Get artworks details
const getArtWorks = async () => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/`, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    };
};

// get artwork by id
const getArtWorkDetails = async (id) => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

// Search artwork by title
const searchArtWorks = async (query) => {

    const config = requestConfig("GET")

    try {
        const res = await fetch(api + "/artworks/search?q=" + query, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res
    } catch (error) {
        console.log(error)
    }

}



const artWorkService = {
    registerArtWork,
    updateArtWork,
    deleteArtWork,
    getArtWorks,
    getArtWorkDetails,
    searchArtWorks
};

export default artWorkService;