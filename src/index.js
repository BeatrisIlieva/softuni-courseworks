import Header from "./components/Header";
import Cat from "./components/Cat";

import "./scss/index.scss";

const app = async () => {
  document.getElementById("header").innerHTML = Header();
  const catContainer = document.getElementById("cat");

  const catImages = await Cat();
  // Append each image element to the container
  catImages.forEach(img => {
    catContainer.appendChild(img); // Append the image element to the DOM
  });
};

app();
