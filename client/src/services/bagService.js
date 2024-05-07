import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/bag";

export const bagServiceFactory = (token) => {
  const request = requestFactory(token);

  const add = async (data, jewelryId) => {
    await request.post(`${baseUrl}/add/${jewelryId}`, data);
  };

  const display = async (userId) => {
    const items = await request.get(`${baseUrl}/display/${userId}`);
    console.log(items);

    return items;
  };

  return { add, display };
};
