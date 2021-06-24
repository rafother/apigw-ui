import {axiosInstance} from "../axios-instance";

export const getAllCDs = () => {
    return axiosInstance.get("/customdomains");
};

export const getCD = (id: string) => {
    return axiosInstance.get(`/customdomains/${id}`);
};

export const createCD = (data: string) => {
    return axiosInstance.post("/customdomains", data);
};

export const updateCD = (id: string, data: string) => {
    return axiosInstance.put(`/customdomains/${id}`, data);
};

export const removeCD = (id: string) => {
    return axiosInstance.delete(`/customdomains/${id}`);
};

