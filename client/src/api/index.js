import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Your server base URL
});

export const registerParcel = async (data) => {
  const response = await api.post('/parcels/register', data);
  return response.data;
};

export const transferParcel = async (data) => {
  const response = await api.post('/parcels/transfer', data);
  return response.data;
};

export const reportParcelLost = async (data) => {
  const response = await api.post('/parcels/lost', data);
  return response.data;
};

export const verifyCheckpoint = async (params) => {
  const response = await api.get('/parcels/verify', { params });
  return response.data;
};

export const getParcelHistory = async (params) => {
  const response = await api.get('/parcels/history', { params });
  return response.data;
};

export const getParcelDetails = async (params) => {
  const response = await api.get('/parcels/details', { params });
  return response.data;
};

export const getNextLocation = async (params) => {
  const response = await api.get('/parcels/next-location', { params });
  return response.data;
};

export const getParcelCount = async (params) => {
  const response = await api.get('/parcels/get-count', { params });
  return response.data;
};


