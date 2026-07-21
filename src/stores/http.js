import axios from "axios";
import exceptionHandler from "@/components/app/exception/js/exception-handler.js";
import {getGatewayUrl} from "@/stores/app.js";
import {getAuthUser} from "@/stores/user.js";
import {useConstStore} from "@/stores/const.js";

useConstStore()

// swagger api http://localhost:8080/swagger-ui/index.html

function createRequestData(payload = {}) {
    return { ...payload };
}

function formatUrl(apiRoute) {
    const user = getAuthUser();
    if (!user) return apiRoute;
    return apiRoute
        .replace(/{id}/g, user.id || '')
        .replace(/{identifier}/g, user.identifier || '');
}

async function handleRequest(requestConfig) {
    useConstStore().isLoading = true;
    let user = getAuthUser();
    if(user){
        requestConfig.headers = {
            ...requestConfig.headers,
            Authorization: `Bearer ${user.tokenAccess}`
        };
    }

    requestConfig.url = getGatewayUrl() + formatUrl(requestConfig.url);

    return await axios(requestConfig).then(response => {
        useConstStore().isLoading = false;
        return response.data;
    }).catch(error => {
        useConstStore().isLoading = false;
        exceptionHandler.handle(error);
        return false;
    });
}

// ------------------------------------------------------------------

export async function getRequest(apiRoute, payload = {}) {
    return handleRequest({
        method: 'get',
        url: apiRoute,
        params: createRequestData(payload)
    });
}

export async function postRequest(apiRoute, payload = {}) {
    return handleRequest({
        method: 'post',
        url: apiRoute,
        data: createRequestData(payload)
    });
}

export async function putRequest(apiRoute, payload = {}) {
    return handleRequest({
        method: 'put',
        url: apiRoute,
        data: createRequestData(payload)
    });
}

export async function deleteRequest(apiRoute, id) {
    return handleRequest({
        method: 'delete',
        url: apiRoute,
    });
}

export async function uploadRequest(apiRoute, formData) {
    const authUUID = getAuthUser()?.id;

    if (authUUID) {
        formData.append('userId', authUUID);
    }

    return handleRequest({
        method: 'post',
        url: apiRoute,
        data: formData,
    });
}

