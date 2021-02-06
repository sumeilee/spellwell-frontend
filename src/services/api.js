import axios from "axios";

export const baseURL = process.env.REACT_APP_API_URL;

export const ax = axios.create({
  baseURL,
  timeout: 5000,
});

const api = {
  createWordBag: (data) => {
    return ax({
      method: "POST",
      url: `${baseURL}/wordbags/new`,
      data,
    });
  },

  updateWordBag: (bagId, data) => {
    return ax({
      method: "PATCH",
      url: `${baseURL}/wordbags/${bagId}/edit`,
      data,
    });
  },

  getWordBag: (id) => {
    return ax({
      method: "GET",
      url: `${baseURL}/wordbags/${id}`,
    });
  },

  getWordBags: () => {
    return ax({
      method: "GET",
      url: `${baseURL}/wordbags`,
    });
  },

  getWordBagsByUser: (userId) => {
    return ax({
      method: "GET",
      url: `${baseURL}/wordbags?owner=${userId}`,
    });
  },

  deleteWordBag: (id) => {
    return ax({
      method: "DELETE",
      url: `${baseURL}/wordbags/${id}`,
    });
  },

  savePractice: (data) => {
    return ax({
      method: "POST",
      url: `${baseURL}/practices/new`,
      data,
    });
  },

  login: (data) => {
    return ax({
      method: "POST",
      url: `${baseURL}/login`,
      data,
    });
  },

  getPracticeList: (user) => {
    return ax({
      method: "GET",
      url: `${baseURL}/practices?user=${user}`,
    });
  },
};

export default api;
