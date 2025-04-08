const createDescription = (data) => {
  const descriptionItems = data.map((item) => {
    const listItems = document.createElement("ul");
    listItems.classList.add("list");

    Object.entries(item).forEach(([key, value]) => {
      if (key !== "url" && key !== "id" && key !== "kind") {
        let keyElement = createKeyElement(key);
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");

        const leftElement = document.createElement("h3");
        leftElement.classList.add("left-element");
        leftElement.textContent = keyElement;

        const rightElement = document.createElement("h4");
        rightElement.classList.add("right-element");
        rightElement.textContent = value;

        listItem.appendChild(leftElement);
        listItem.appendChild(rightElement);

        listItems.appendChild(listItem);
      }
    });
    return listItems;
  });

  return descriptionItems;
};

const createKeyElement = (key) => {
  let receivedKey = key !== "name" ? key : "breed";

  let keyWords = receivedKey.split("_");
  let keyElement = "";

  keyWords.forEach((word) => {
    let firstLetter = word.charAt(0).toUpperCase();
    let restLetters = word.slice(1);

    keyElement += firstLetter.concat(`${restLetters} `);
  });

  const result = keyElement.trim() + ":";

  return result;
};

export default createDescription;
