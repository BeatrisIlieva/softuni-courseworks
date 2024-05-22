import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/users";

export const authServiceFactory = (token) => {
  const request = requestFactory(token);

  const ids = JSON.parse(localStorage.getItem("wishlist"));
  const queryString = ids.map((id) => `id=${id}`).join("&");

  return {
    login: (data) => request.post(`${baseUrl}/login?${queryString}`, data),

    register: (data) => request.post(`${baseUrl}/register?${queryString}`, data),

    getOne: (userId) => request.get(`${baseUrl}/user/${userId}`),

    updateEmail: (userId, data) =>
      request.put(`${baseUrl}/edit-email/${userId}`, data),

    changePassword: (userId, data) =>
      request.put(`${baseUrl}/change-password/${userId}`, data),

    logout: () => request.get(`${baseUrl}/logout`),
  };
};
