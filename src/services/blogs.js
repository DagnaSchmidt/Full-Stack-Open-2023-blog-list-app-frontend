import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data.sort((a, b) => b.likes - a.likes));
};

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token 
    },  
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id) => {
  const request = axios.put(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

const remove = (id) => {
  const config = {
    headers: {
      Authorization: token 
    },  
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then(response => response.data);
};

const updateComment = (id, newComment) => {
  const request = axios.put(`${baseUrl}/${id}/comments`, newComment);
  return request.then(response => response.data);
};

// eslint-disable-next-line
export { getAll, setToken, create, update, remove, updateComment }