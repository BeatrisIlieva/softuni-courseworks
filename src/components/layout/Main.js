"use strict";

import fetchData from "../../services/fetchData";
import createAnimal from "../../utils/createAnimal";
import createCard from "../../utils/createCard";
import urls from "../../constants/urls";
import createLayout from "../../utils/createLayout";

const Main = async () => {
  const currentKindOfAnimal = "Cat";
  const currentUrl = urls[currentKindOfAnimal];

  const data = await fetchData(currentUrl);

  const dataObjects = data.map((el) => {
    return createAnimal(currentKindOfAnimal, el);
  });

  const cards = createCard(dataObjects);

  const result = createLayout(cards);

  return result;
};

export default Main;
