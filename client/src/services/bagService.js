import { requestFactory } from "./requester"

const baseUrl = "http://localhost:3030/bag";


export const bagServiceFactory = (token) => {
  const request = requestFactory(token);

  const addToBag = async (data, jewelryId) => {
    console.log("Here");
    console.log(data);
    // addToBag: (data) => request.post("http://localhost:3030/bag/19", data)
    await request.post(`${baseUrl}/${jewelryId}`, data);

  };

  const displayBag = async (categoryId, jewelryId) => {
    const jewelry = await request.get(
      `${baseUrl}/${categoryId}/${jewelryId}`
    );
    return jewelry;
  };

  return { addToBag, displayBag };
};
