const baseUrl = "http://localhost:3030";
export const getAll = async () => {
const categoryId = 2;
  const response = await fetch(`${baseUrl}/${categoryId}`);
//   const response = await fetch(baseUrl);
  const result = await response.json();
  console.log(result);
  return result;
};
