"use strict";

import fetchData from "../../services/fetchData";
import createAnimal from "../../utils/createAnimal";
import createCard from "../../utils/createCard";
import urls from "../../constants/urls";
import createLayout from "../../utils/createLayout";
import createDescription from "../../utils/createDescription";

const Main = async () => {
  const currentKindOfAnimal = "Cat";
  const currentUrl = urls[currentKindOfAnimal];

  const data = await fetchData(currentUrl);

  const dataObjects = data.map((el) => {
    return createAnimal(currentKindOfAnimal, el);
  });

  const cards = createCard(dataObjects);

  const descriptions = createDescription(dataObjects);

  const result = createLayout(cards, descriptions);

  return result;
};

export default Main;
