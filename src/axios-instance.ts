import axios from "axios";
import {initializeAxiosMockAdapter, isMockEnabled,} from "./mock/mock.config";

let instance = axios.create({
    baseURL: window.location.pathname,
    headers: {
        "Content-type": "application/json"
    }
});

if (isMockEnabled()) {
    initializeAxiosMockAdapter(instance);
}

export const axiosInstance = instance;
