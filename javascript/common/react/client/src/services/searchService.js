import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/search";
export const searchServiceFactory = (token) => {
  const request = requestFactory(token);

  const user = localStorage.getItem("userUUID");

  const display = async (query) => {
    const jewelries = await request.get(
      `${baseUrl}/display/${user}?query=${query}`
    );

    return jewelries;
  };

  return { display };
};
