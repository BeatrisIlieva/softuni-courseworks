"use strict";

import fetchData from "../services/fetchData";
import createAnimal from "../utils/createAnimal";

const catsUrl =
  "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_tsajPiuraUElbMg02ZXoB0xjlNtutoamS75kWTdQKYQ3pHWnaWAuRjw8MRcX98oD&breed_ids=acur&breed_ids=pers&breed_ids=bslo&breed_ids=birm&breed_ids=sfol&breed_ids=ragd&breed_ids=tang";

const dogsUrl =
  "https://api.thedogapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_8k0bswMQHsla4qR661aep5e6QmCkwd7ws4rWDcOUsFR6gzOJMK5z8zpCEEsJROBu";

const Main = async () => {
  const catsData = await fetchData(catsUrl);
  const dogsData = await fetchData(dogsUrl);

  console.log(catsData);
  console.log(dogsData);

  const catObjects = catsData.map((cat) => {
    return createAnimal("Cat", cat);
  });

  const dogObjects = catsData.map((cat) => {
    return createAnimal("Dog", cat);
  });

  console.log(catObjects, dogObjects);
  //   const images = cats.map((image) => image.url);

  //   const template = images.map((image) => {
  //     let imageElm = document.createElement("img");
  //     imageElm.src = image;
  //     imageElm.alt = "Cat Image";
  //     return imageElm;
  //   });

  //   return template;
};

export default Main;
