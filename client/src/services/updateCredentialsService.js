import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/users";

export const updateCredentialsServiceFactory = (token) => {
  const request = requestFactory(token);
  

  return {
    updateEmail: (userId, data) =>
      request.put(`${baseUrl}/edit-email/${userId}`, data),

    changePassword: (userId, data) =>
      request.put(`${baseUrl}/change-password/${userId}`, data),
  };
};