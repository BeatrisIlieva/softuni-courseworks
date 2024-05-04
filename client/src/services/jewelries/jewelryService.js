import { requestFactory } from "../requester"

const baseUrl = "http://localhost:3030";

export const jewelryServiceFactory = (token) => {
  const request = requestFactory(token);

  const getAll = async (categoryId) => {
    const jewelries = await request.get(`${baseUrl}/${categoryId}`);

    return jewelries;
  };

  const getOne = async (categoryId, jewelryId) => {
    const jewelry = await request.get(
      `${baseUrl}/${categoryId}/${jewelryId}`
    );
    return jewelry;
  };

  return { getAll, getOne };
};
