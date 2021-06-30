import {axiosInstance} from "../axios-instance";

export const getClusterData = () => {
    return axiosInstance.get("/clusterdata");
};

export const onBoarding = (data: string) => {
    return axiosInstance.post("/onBoard", data);
};



