import axios from 'axios'
import * as tokenService from './tokenService'


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/StyleStash/user`


function getUser() {
  return tokenService.getUserFromToken()
}


async function signup(user) {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, user);

    const json = response.data;

    if (json.token) {
      tokenService.setToken(json.token);
      return json.token;
    }
    if (json.err) {
      throw new Error(json.err);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}



async function login(credentials) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);

    const json = response.data;

    if (json.token) {
      tokenService.setToken(json.token);
    }

    if (json.err) {
      throw new Error(json.err);
    }
  } catch (err) {
    throw err;
  }
}


function logout() {
  tokenService.removeToken()
}

export { signup, getUser, logout, login }