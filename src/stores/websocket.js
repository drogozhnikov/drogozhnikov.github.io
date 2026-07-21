import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Client } from '@stomp/stompjs';
import {getWSUrl} from '@/stores/app.js';
import { getAuthUser } from '@/stores/user.js';

export const useWebSocketStore = defineStore('websocket', () => {
    const isConnected = ref(false);
    let stompClient = null;

    const activeSubscriptions = new Map();

    function connect() {
        if (stompClient && isConnected.value) return;

        const token = getAuthUser()?.tokenAccess;
        if (!token) {
            console.error('[WS] Не удалось подключиться: токен отсутствует.');
            return;
        }

        const wsAuthenticatedUrl = `${getWSUrl()}?token=${encodeURIComponent(token)}`;

        stompClient = new Client({
            brokerURL: wsAuthenticatedUrl,
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        console.log(stompClient)

        stompClient.onConnect = (frame) => {
            isConnected.value = true;
            console.log('[WS] Успешно подключено к брокеру:', frame);

            // При каждом подключении (включая авто-реконнект) принудительно обновляем подписки
            activeSubscriptions.forEach((subData, topic) => {
                subData.subscription = stompClient.subscribe(topic, subData.callback);
            });
        };

        stompClient.onWebSocketClose = () => {
            isConnected.value = false;
            console.warn('[WS] Соединение закрыто.');
        };

        stompClient.onStompError = (frame) => {
            isConnected.value = false;
            console.error('[WS] Ошибка STOMP:', frame.headers['message']);
        };

        stompClient.activate();
    }

    function subscribe(topic, callback) {
        const wrappedCallback = (message) => {
            try {
                const parsedBody = JSON.parse(message.body);
                callback(parsedBody, message);
            } catch (e) {
                callback(message.body, message);
            }
        };

        let subscription = null;
        if (stompClient && isConnected.value) {
            subscription = stompClient.subscribe(topic, wrappedCallback);
        }

        activeSubscriptions.set(topic, { callback: wrappedCallback, subscription });
    }

    function unsubscribe(topic) {
        const subData = activeSubscriptions.get(topic);
        if (subData) {
            if (subData.subscription && isConnected.value) {
                try {
                    subData.subscription.unsubscribe();
                } catch (e) {
                    console.error(`[WS] Ошибка при отписке от топика ${topic}:`, e);
                }
            }
            activeSubscriptions.delete(topic);
            console.log(`[WS] Успешная отписка от топика: ${topic}`);
        }
    }

    function send(destination, body = {}, headers = {}) {
        if (stompClient && isConnected.value) {
            stompClient.publish({
                destination,
                headers,
                body: JSON.stringify(body)
            });
        } else {
            console.warn('[WS] Отправка не удалась: соединение не установлено.');
        }
    }

    function disconnect() {
        if (stompClient) {
            stompClient.deactivate().then(() => {
                isConnected.value = false;
                activeSubscriptions.clear();
                console.log('[WS] Клиент деактивирован.');
            });
        }
    }

    return {
        isConnected,
        connect,
        disconnect,
        subscribe,
        unsubscribe, // <-- ОБЯЗАТЕЛЬНО ЭКСПОРТИРУЕМ
        send
    };
});