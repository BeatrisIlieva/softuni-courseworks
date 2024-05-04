import { requestFactory } from "./requester";

const baseUrl = "";

const request = requestFactory();

export const create = async (jewelryId) => {
    const result = await request.post(baseUrl, {jewelryId});

    return result;
}