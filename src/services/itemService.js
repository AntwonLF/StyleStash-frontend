import axios from "axios";
import * as tokenService from "./tokenService.js"


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/StyleStash/items`;


async function getItem(itemId) {

    try {
        const res = await axios.get(`${BASE_URL}/${itemId}`, {
            headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
        })
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function updateItem(itemId, updatedItemData) {
    try {
        const res = await axios.put(`${BASE_URL}/updateItem/${itemId}`, updatedItemData, {
            headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}



export { getItem, updateItem }