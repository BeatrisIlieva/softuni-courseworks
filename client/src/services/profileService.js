import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/profiles";

export const profileServiceFactory = (token) => {
  const request = requestFactory(token);

  const getDetails = async () => {
    const details = await request.get(`${baseUrl}/edit-personal-details`);

    return details;
  };


  return { getDetails };
};
