import { jwtDecode } from 'jwt-decode'


function getUserFromToken() {

    const token = getToken()

    return token ? jwtDecode(token).user : null
}

function getProfileFromToken() {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        console.log("Decoded Token Payload:", payload);
        const profileId = payload.user.profile;
        console.log("Profile ID from Token:", profileId);
        return profileId;
    }
    return null;
}


function getClosetFromToken() {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        console.log("Decoded Token Payload:", payload);
        const closetId = payload.user.closet;
        console.log("Closet ID from Token:", closetId);
        return closetId;
    }
}


function setToken(token) {

    localStorage.setItem('token', token)
}


function getToken() {

    let token = localStorage.getItem('token')

    if (token) {

        const payload = jwtDecode(token)
        console.log(payload)

        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token')

            token = null
        }
    }
    return token
}


function removeToken() {

    localStorage.removeItem('token')
}

export { setToken, getUserFromToken, getToken, removeToken, getProfileFromToken, getClosetFromToken }