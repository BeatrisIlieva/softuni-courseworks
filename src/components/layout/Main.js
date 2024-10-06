"use strict";

import fetchData from "../../services/fetchData";
import createCat from "../../utils/createCat";
import createCard from "../../utils/createCard";
import createLayout from "../../utils/createLayout";
import createDescription from "../../utils/createDescription";
import findTheLargestLifeSpan from "../../functions/findTheLargestLifeSpan";
import catContext from "../../contexts/catContext";

const Main = async () => {
  // const data = await fetchData(
  //   "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_tsajPiuraUElbMg02ZXoB0xjlNtutoamS75kWTdQKYQ3pHWnaWAuRjw8MRcX98oD&breed_ids=acur&breed_ids=pers&breed_ids=bslo&breed_ids=birm&breed_ids=sfol&breed_ids=ragd&breed_ids=tang"
  // );
  const catManager = catContext();

  await catManager.fetchData();

  const data = catManager.getCats()
  console.log(data)


  const dataObjects = data.map((el) => {
    return createCat(el);
  });

  const cards = createCard(dataObjects);

  const descriptions = createDescription(dataObjects);

  const result = createLayout(cards, descriptions);

  const findTheLargestLifeSpanButton = document.createElement("button")
  findTheLargestLifeSpanButton.textContent= "findTheLargestLifeSpanButton"
  findTheLargestLifeSpanButton.addEventListener("click", findTheLargestLifeSpan(() =>(dataObjects)))

  return {result, findTheLargestLifeSpanButton};
};

export default Main;
