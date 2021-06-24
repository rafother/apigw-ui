import {axiosInstance} from "../axios-instance";

export const getClusterData = () => {
    return axiosInstance.get("/clusterdata");
};


