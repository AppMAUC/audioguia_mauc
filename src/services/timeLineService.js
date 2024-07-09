import { api, requestConfig } from '../utils/config';

const route = "timelines";

const registerTimeLine = async (data, token) => {

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

const updateTimeLine = async (id, data, token) => {

    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

const deleteTimeLine= async (id, token) => {

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

const getTimeLines = async () => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/`, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    };
};


const getTimeLineById = async (id) => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

const searchTimeLines = async (query) => {

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



const timeLineService = {
    registerTimeLine,
    updateTimeLine,
    deleteTimeLine,
    getTimeLines,
    getTimeLineById,
    searchTimeLines
};

export default timeLineService;