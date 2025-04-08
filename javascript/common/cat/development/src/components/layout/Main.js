"use strict";

import createCat from "../../utils/createCat";
import createCard from "../../utils/createCard";
import createLayout from "../../utils/createLayout";
import createDescription from "../../utils/createDescription";
import catContext from "../../contexts/catContext";

const Main = async () => {
  const context = new catContext();

  const functionMapper = {
    getAll: context.getAllCats.bind(context),
    getByLifeSpan: context.getCatsByTheLargestLifeSpan.bind(context),
  };

  let data;

  if (!Array.isArray(data)) {
    data.push(functionMapper.getAll());
  }

  const dataObjects = data.map((el) => {
    return createCat(el);
  });

  const cards = createCard(dataObjects);

  const descriptions = createDescription(dataObjects);

  const result = createLayout(cards, descriptions);

  const findTheLargestLifeSpanButton = document.createElement("button");
  findTheLargestLifeSpanButton.textContent = "findTheLargestLifeSpanButton";
  findTheLargestLifeSpanButton.addEventListener("click", () =>
    updateRequestedAction(catManager.getCatsByTheLargestLifeSpan)
  );

  return { result, findTheLargestLifeSpanButton };
};

export default Main;
