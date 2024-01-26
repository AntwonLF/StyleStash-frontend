import axios from "axios";
import * as tokenService from "./tokenService";


// This is the base URL for our API
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/StyleStash/closet`;

//get closet
async function getCloset(closetId) {
    try {
        const res = await axios.get(`${BASE_URL}/${closetId}`, {
            headers : {'Authorization':`Bearer ${tokenService.getToken()}`}
        })
        return res.data
    } catch (error) {
        console.error(err)
        throw error
    }
}

async function addCloset() {
    try {
        const res = await axios.post(`${BASE_URL}/addCloset`, {
            headers : {'Authorization':`Bearer ${tokenService.getToken()}`}
        })
        return res.data
    } catch (error) {
        console.error(err)
        throw error
    }
}

async function getByCategory(closetId, category) {
    try {
        const res = await axios.get(`${BASE_URL}/${closetId}/${category}`, {
            headers : {'Authorization':`Bearer ${tokenService.getToken()}`}
        })
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function addItem (formData, closetId) {
    try {
        // Assuming formData is an object and you need to add closetId to it
        const dataToSend = {
            ...formData,
            // closetId: closetId
        };
        console.log(dataToSend)

        const res = await axios.post(`${BASE_URL}/${closetId}/addItem`, dataToSend, {
            headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
        });
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export {getCloset, addCloset, getByCategory, addItem}