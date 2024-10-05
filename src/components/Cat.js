"use strict";

const url =
  "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_tsajPiuraUElbMg02ZXoB0xjlNtutoamS75kWTdQKYQ3pHWnaWAuRjw8MRcX98oD&breed_ids=acur&breed_ids=pers&breed_ids=bslo&breed_ids=birm&breed_ids=sfol&breed_ids=ragd&breed_ids=tang";

const Cat = async () => {
  let cats;

  const response = await fetch(url);
  const data = await response.json();
  cats = structuredClone(data);

  console.log(cats);

  const images = cats.map((image) => image.url);

  //   console.log(images)

  const template = images.map((image) => {
    let imageElm = document.createElement("img");
    imageElm.src = image;
    imageElm.alt = "Cat Image";
    return imageElm;
  });

  console.log(template);

  return template;
};

export default Cat;
