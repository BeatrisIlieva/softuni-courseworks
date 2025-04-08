const createCard = (data) => {
  const cards = data.map((el) => {
    const cardContainer = document.createElement("div");

    const imageThumbnail = document.createElement("div");
    imageThumbnail.classList.add("thumbnail");
    const imageElement = document.createElement("img");
    imageElement.classList.add("image");
    imageElement.src = el.url;
    imageElement.alt = el.kind;
    imageThumbnail.appendChild(imageElement);

    cardContainer.appendChild(imageThumbnail);

    return cardContainer;
  });

  return cards;
};

export default createCard;
