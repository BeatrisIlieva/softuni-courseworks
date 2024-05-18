import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/users";

export const authServiceFactory = (token) => {
  const request = requestFactory(token);
  

  return {
    login: (data) => request.post(`${baseUrl}/login`, data),

    register: (data) => request.post(`${baseUrl}/register`, data),

    getOne: (userId) => request.get(`${baseUrl}/user/${userId}`),

    updateEmail: (userId, data) => request.put(`${baseUrl}/edit-email/${userId}`, data),

    changePassword: (userId, data) => request.put(`${baseUrl}/change-password/${userId}`, data),

    logout: () => request.get(`${baseUrl}/logout`),
  };
};
