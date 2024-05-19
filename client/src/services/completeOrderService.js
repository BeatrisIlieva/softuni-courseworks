import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/complete-order";

export const completeOrderServiceFactory = (token) => {
  const request = requestFactory(token);

  const getOne = async (userId) => {
    const addressBook = await request.get(`${baseUrl}/${userId}`);

    return addressBook;
  };

  const update = async (userId, data) => {
    const addressBook = await request.put(`${baseUrl}/update/${userId}`, data);

    return addressBook;
  };

  return { getOne, update };
};
