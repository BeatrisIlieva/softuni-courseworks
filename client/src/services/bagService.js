import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/bag";

export const bagServiceFactory = (token) => {
  const request = requestFactory(token);

  const add = async (data, jewelryId) => {
    await request.post(`${baseUrl}/add/${jewelryId}`, data);
  };

  const display = async (userId) => {
    const items = await request.get(`${baseUrl}/display/${userId}`);

    return items;
  };

  const decrease = async (bagId) => {
    await request.put(`${baseUrl}/decrease/${bagId}`);
  };

  const increase = async (bagId) => {
    await request.put(`${baseUrl}/increase/${bagId}`);
  };

  return { add, display, decrease, increase };
};
