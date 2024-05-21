import { requestFactory } from "./requester";
import { useAuthContext } from "../contexts/AuthContext";
const baseUrl = "http://localhost:3030/bag";

export const bagServiceFactory = (token) => {
  const request = requestFactory(token);



  const add = async (data, jewelryId) => {
    await request.post(`${baseUrl}/add/${jewelryId}`, data);
  };

  const display = async (user) => {
    const items = await request.get(`${baseUrl}/display/${user}`);

    return items;
  };

  const decrease = async (bagId) => {
    await request.put(`${baseUrl}/decrease/${bagId}`);
  };

  const increase = async (bagId) => {
    await request.put(`${baseUrl}/increase/${bagId}`);
  };

  const update = async (bagId, quantity) => {
    await request.put(`${baseUrl}/update/${bagId}`, quantity);
  };

  const remove = async (bagId) => {
    await request.delete(`${baseUrl}/delete/${bagId}`);
  };

  return { add, display, decrease, increase, update, remove };
};
