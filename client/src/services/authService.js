import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/users";

export const authServiceFactory = (token) => {
  const request = requestFactory(token);
  

  return {
    login: (data) => request.post(`${baseUrl}/login`, data),

    register: (data) => request.post(`${baseUrl}/register`, data),

    edit: (data, userId) => request.put(`${baseUrl}/profiles/${userId}`, data),

    // getPersonalDetails: () =>
    //   request.get("http://localhost:3030/profiles/get-personal-details"),

    // editDeliveryDetails: (data) =>
    //   request.put(`${baseUrl}/edit-delivery-details`, data),

    editEmail: (data) => request.put(`${baseUrl}/edit-email`, data),

    editPassword: (data) => request.put(`${baseUrl}/edit-password`, data),

    logout: () => request.get(`${baseUrl}/logout`),
  };
};
