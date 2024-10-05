    const createCard = (data) => {
  const cards = data.map((el) => {
    console.log(el)
    const cardContainer = document.createElement("div");

    const imageThumbnail = document.createElement("div");
    const imageElement = document.createElement("img");
    imageElement.src = el.url;
    imageElement.alt = el.kind;
    imageThumbnail.appendChild(imageElement);

    cardContainer.appendChild(imageThumbnail);

    return cardContainer;
  });

  return cards;
};

export default createCard;
