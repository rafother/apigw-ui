import {axiosInstance} from "../axios-instance";

export const getAllAPIs = () => {
    return axiosInstance.get("/api"); // TODO: should the path be /api or /apis ?
};

export const getAPI = (id: string) => {
    return axiosInstance.get(`/apis/${id}`);
};

export const createAPI = (data: string) => {
    return axiosInstance.post("/apis", data);
};

export const updateAPI = (id: string, data: string) => {
    return axiosInstance.put(`/apis/${id}`, data);
};

export const removeAPI = (id: string) => {
    return axiosInstance.delete(`/apis/${id}`);
};

