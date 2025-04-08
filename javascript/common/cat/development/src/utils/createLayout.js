const createLayout = (cards, descriptions) => {
  const gridContainer = document.createElement("section");
  gridContainer.classList.add("grid-container");

  for (let index = 0; index < cards.length; index++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    
    wrapper.appendChild(cards[index]);
    wrapper.appendChild(descriptions[index])

    gridContainer.appendChild(wrapper);


  }

  return gridContainer;
};

export default createLayout;
