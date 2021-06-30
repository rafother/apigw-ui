import {axiosInstance} from "../axios-instance";

export const getAllAPIs = () => {
    return axiosInstance.get("/api");
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

