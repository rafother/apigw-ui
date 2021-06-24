import apis from './mock-data/apis.json'
import cd from './mock-data/customdomains.json'
import clusterdata from './mock-data/clusterdata.json'
import MockAdapter from "axios-mock-adapter";

let apisList = apis.apis;
let cdsList = cd.customdomains
export const isMockEnabled = () => {
    return process.env.REACT_APP_MOCK_ENABLED === 'true'
};

export const initializeAxiosMockAdapter = (instance) => {
    const mock = new MockAdapter(instance);
    mock.onGet("/clusterdata").reply(() => getClusterData());
    mock.onGet("/apis").reply(() => getAPIs());
    mock.onGet(/\/apis\/\d+/).reply(config => getAPI(config));
    mock.onPost("/apis").reply(config => addAPI(config));
    mock.onPut(/\/apis\/\d+/).reply(config => editAPI(config));
    mock.onDelete(/\/apis\/\d+/).reply(config => removeAPI(config))
    mock.onGet("/customdomains").reply(() => getCDs());
    mock.onGet(/\/customdomains\/\d+/).reply(config => getCD(config));
    mock.onPost("/customdomains").reply(config => addCD(config));
    mock.onPut(/\/customdomains\/\d+/).reply(config => editCD(config));
    mock.onDelete(/\/customdomains\/\d+/).reply(config => removeCD(config))
};

export const getClusterData = () => {
    return [200, clusterdata]
};

export const getAPIs = () => {
    return [200, apisList]
};

export const getAPI = (config) => {
    const id = extractIdPathParamFromUrl(config);
    const api = apisList.find(c => c.id === id);
    return [200, api];
};

const extractIdPathParamFromUrl = (config) => {
    return config.url.split('/').pop();
};

export const addAPI = (config) => {
    const api = JSON.parse(config.data);
    apisList.push(api);
    return [200, api];
};

export const editAPI = (config) => {
    const id = extractIdPathParamFromUrl(config);
    const apiIndex = apisList.findIndex(c => c.id === id);
    const api = JSON.parse(config.data);
    apisList[apiIndex] = api;
    return [200, api];
};

export const removeAPI = (config) => {
    const id = extractIdPathParamFromUrl(config);
    apisList = apisList.filter(c => c.id !== id);
    return [204, null];
};

export const getCDs = () => {
    return [200, cdsList]
};

export const getCD = (config) => {
    const id = extractIdPathParamFromUrl(config);
    const cd = cdsList.find(c => c.id === id);
    return [200, cd];
};

export const addCD = (config) => {
    const cd = JSON.parse(config.data);
    cdsList.push(cd);
    return [200, cd];
};

export const editCD = (config) => {
    const id = extractIdPathParamFromUrl(config);
    const cdIndex = cdsList.findIndex(c => c.id === id);
    const cd = JSON.parse(config.data);
    cdsList[cdIndex] = cd;
    return [200, cd];
};

export const removeCD = (config) => {
    const id = extractIdPathParamFromUrl(config);
    cdsList = cdsList.filter(c => c.id !== id);
    return [204, null];
};