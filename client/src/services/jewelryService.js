const baseUrl = "http://localhost:3030";

export const getAll = async (categoryId) => {
  const response = await fetch(`${baseUrl}/${categoryId}`);

  const result = await response.json();

  return result;
};

export const getOne = async (categoryId, jewelryId) => {
  const response = await fetch(`${baseUrl}/${categoryId}/${jewelryId}`);

  const result = await response.json();

  return result;
};
