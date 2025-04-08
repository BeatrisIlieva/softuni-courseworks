import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/order-confirmation";

export const orderConfirmationServiceFactory = (token) => {
  const request = requestFactory(token);

  const display = async (userId) => {
    const {order, address} = await request.get(`${baseUrl}/display/${userId}`);
    console.log(`Address: ${address}`)
    console.log(`Order: ${order}`)

    return {order, address};
  };

  return { display };
};