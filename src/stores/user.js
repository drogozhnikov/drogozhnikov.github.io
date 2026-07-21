import {jwtDecode} from "jwt-decode";
import router from "@/router/index.js";
import exceptionHandler from "@/components/app/exception/js/exception-handler.js";

const USER = "user"
// const GUEST = "guest"

const ACCEPT = "application/json"
const SIGNIN_PAGE = "./"

export const saveUserData = (response) => {
    validateResponse(response).then(validation => {
        if(validation){
            let convertedUser = authResponseConverter(response)
            localStorage.setItem(USER, JSON.stringify(convertedUser))
            return true
        }
    })
    return false
}

async function validateResponse(response) {
    try {
        if (!response || typeof response.accessToken !== 'string') {
            throw new Error("Токен отсутствует или имеет неверный формат");
        }
        jwtDecode(response.accessToken);
        return true
    } catch (error) {
        exceptionHandler.showException("JWT", "Parse error")
        console.error("Ошибка при декодировании JWT:", error.message);
        return false
    }
}

function authResponseConverter(response) {
    let user = response.user
    return {
        identifier: user.identifier,
        id: user.id,
        fullName: user.fullName,
        status: user.status,

        role: {
            id: user.role.id,
            title: user.role.title,
            name: user.role.name,
            description: user.role.description,
        },

        rolePermissions: user.role.permissions,
        directPermissions: user.directPermissions,

        tokenAccess: response.accessToken,
        tokenRefresh: response.refreshToken,
        tokenExpireAccess: response.accessTokenExpiresIn,
        tokenExpireRefresh: response.refreshTokenExpiresIn,
    }
}

export const saveDebugData = () => {
    let userData = {}
    localStorage.setItem(USER, JSON.stringify(userData))
}


export const getAuthHeader = () => {
    let user = JSON.parse(localStorage.getItem(USER));
    if (!user) {
        cleanUserData()
        router.push(SIGNIN_PAGE)
    }
    return {
        Accept: ACCEPT,
        Authorization: user.token,
        UserId: user.uuid
    };
}

export const getAuthUser = () => {
    return JSON.parse(localStorage.getItem(USER))
}

export const cleanUserData = () => {
    localStorage.removeItem(USER)
}
