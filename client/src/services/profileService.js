import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/profiles";

export const profileServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    display: (userId) => request.get(`${baseUrl}/display/${userId}`),
    
    update: (userId, data) => request.put(`${baseUrl}/edit/${userId}`, data),
  };
};
