const createLayout = (cards) => {
  const gridContainer = document.createElement("section");
  gridContainer.classList.add("grid-container");

  for (let index = 0; index < cards.length; index++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    
    wrapper.appendChild(cards[index]);

    gridContainer.appendChild(wrapper)
  }

  return gridContainer;
};

export default createLayout;
