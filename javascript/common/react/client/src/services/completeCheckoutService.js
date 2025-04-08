import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/complete-transaction";

export const completeCheckoutServiceFactory = (token) => {
  const request = requestFactory(token);

  const confirm = async (userId, data) => {
    await request.post(`${baseUrl}/${userId}`, data);
  };

  return { confirm };
};
