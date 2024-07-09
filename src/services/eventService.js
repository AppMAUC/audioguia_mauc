import { api, requestConfig } from '../utils/config';

const route = "events";

const registerEvent = async (data, token) => {

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

const updateEvent = async (id, data, token) => {

    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

const deleteEvent= async (id, token) => {

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

const getEvents = async () => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/`, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    };
};


const getEventById = async (id) => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

const searchEvents = async (query) => {

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



const eventService = {
    registerEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventById,
    searchEvents
};

export default eventService;