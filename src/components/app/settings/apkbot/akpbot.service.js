import {deleteRequest, postRequest, putRequest} from "@/stores/http.js";
import {getAuthUser} from "@/stores/user.js";
import {de} from "vuetify/locale";

const API_ROUTES = {
    BOT_USER: 'bot/user/',
    BOT_DEVICE: 'bot/device/',
};

class AkpbotService {

    async get() {
        let user = getAuthUser()
        return postRequest(
            API_ROUTES.BOT_USER,
            {
                userName: user.identifier,
                fullName: user.fullName,
                devices: []
            }
        )
    }

    async createDevice(device) {
        return postRequest(
            API_ROUTES.BOT_DEVICE,
            {
                macAddress: device.macAddress,
                description: device.description
            }
        )
    }

    async updateDevice(device) {
        return putRequest(
            API_ROUTES.BOT_DEVICE,
            {
                id: device.id,
                macAddress: device.macAddress,
                description: device.description
            }
        )
    }

    async deleteDevice(id) {
        return deleteRequest(
            API_ROUTES.BOT_DEVICE, id,
        )
    }
}

export default new AkpbotService()