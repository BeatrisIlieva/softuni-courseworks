import * as request from "../requester";

const baseUrl = "http://localhost:3030";

export const getAll = async (categoryId) => {
  const jewelries = await request.get(`${baseUrl}/${categoryId}`)

  return jewelries;
  // const response = await fetch(`${baseUrl}/${categoryId}`);

  // const result = await response.json();

  // return result;
};

export const getOne = async (categoryId, jewelryId) => {
  const jewelry = await request("GET", `${baseUrl}/${categoryId}/${jewelryId}`)
  return jewelry;
  // const response = await fetch(`${baseUrl}/${categoryId}/${jewelryId}`);

  // const result = await response.json();

  // return result;
};