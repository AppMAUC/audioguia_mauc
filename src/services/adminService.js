import { api, requestConfig } from '../utils/config';

const route = "admin";

// update admin details
const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token, true)

    try {
        const res = await fetch(api + `/${route}/`, config).then((res) => res.json()).catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    };

};

// Get admins 
const admins = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + `/${route}/`, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    };
};

// get admin by id
const getAdminById = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + `/${route}/` + id, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }

};

// Get admin details
const profile = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + `/${route}/profile`, config).then((res) => res.json()).catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    };
};

const adminService = {
    updateProfile,
    admins,
    getAdminById,
    profile,
};

export default adminService;