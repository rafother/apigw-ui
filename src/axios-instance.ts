import axios from "axios";
import {initializeAxiosMockAdapter, isMockEnabled,} from "./mock/mock.config";

let instance = axios.create({
    baseURL: "https://api.admin.btpapigw.com", //"https://y2btb9dqo0.execute-api.eu-central-1.amazonaws.com/prod", //window.location.pathname,
    headers: {
        "Content-type": "application/json"
    }
});

if (isMockEnabled()) {
    initializeAxiosMockAdapter(instance);
}

export const axiosInstance = instance;
