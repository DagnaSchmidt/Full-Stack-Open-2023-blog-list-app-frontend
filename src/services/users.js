import axios from 'axios';
const baseUrl = '/api/users';

export const getSingleUser = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
};

export const getAllUsers = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
};