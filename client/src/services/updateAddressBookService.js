import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/addresses";

export const updateAddressBookServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    display: (userId) => request.get(`${baseUrl}/display/${userId}`),

    update: (userId, data) => request.put(`${baseUrl}/edit/${userId}`, data),
  };
};
