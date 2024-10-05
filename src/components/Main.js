"use strict";

import fetchData from "../services/fetchData";
import createAnimal from "../utils/createAnimal";
import createCard from "../utils/createCard";
import urls from "../constants/urls";

const Main = async () => {
  const catsData = await fetchData(urls.catsUrl);
  const dogsData = await fetchData(urls.dogsUrl);

  const catObjects = catsData.map((cat) => {
    return createAnimal("Cat", cat);
  });

  const dogObjects = dogsData.map((cat) => {
    return createAnimal("Dog", cat);
  });

  const catTemplate = createCard(catObjects);
  const dogTemplate = createCard(dogObjects);

  return [catTemplate, dogTemplate];
};

export default Main;
