import axios from 'axios';

const API_HOST = 'http://localhost:8000';


export const ShopApi = axios.create({
    baseURL: API_HOST,
})

const GetStores = () => {
    return ShopApi.get(`stores`);
}

const GetStore = storeId => {
    return ShopApi.get(`stores/${storeId}`);
}

const DeleteStore = storeId => {
    return ShopApi.delete(`stores/${storeId}`);
}

const CreateStore = objStore => {
    return ShopApi.post(`stores`, objStore);
}

const EditStore = (storeId, objStore) => {
    return ShopApi.put(`stores/${storeId}`, objStore);
}

const GetItem = (storeId, itemId) => {
    return ShopApi.get(`stores/${storeId}/item/${itemId}`);
}

const DeleteItem = (storeId, itemId) => {
    return ShopApi.delete(`stores/${storeId}/item/${itemId}`);
}

const CreateItem = (storeId,objItem) => {
    return ShopApi.post(`stores/${storeId}/item`, objItem);
}

const EditItem = (storeId, itemId, objItem) => {
    return ShopApi.put(`stores/${storeId}/item/${itemId}`, objItem);
}

const Api = {
    GetStores,
    GetStore,
    DeleteStore,
    CreateStore,
    EditStore,
    GetItem,
    DeleteItem,
    CreateItem,
    EditItem
}

export default Api;