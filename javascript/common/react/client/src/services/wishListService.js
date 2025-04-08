import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/wishlist";
export const wishListServiceFactory = (token) => {
  const request = requestFactory(token);

  const create = async (_id) => {
    await request.post(`${baseUrl}/create/${_id}`);
  };

  const display = async (user) => {
    const ids = JSON.parse(localStorage.getItem("wishlist"));
    const queryString = ids.map((id) => `id=${id}`).join("&");

    const jewelries = await request.get(
      `${baseUrl}/display/${user}?${queryString}`
    );
    return jewelries;
  };

  const remove = async (jewelryId) => {
    await request.post(`${baseUrl}/delete/${jewelryId}`);
  };

  return { create, remove, display };
};
