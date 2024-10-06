import Header from "./components/layout/Header";
import Main from "./components/layout/Main";

import "./scss/index.scss";

const app = async () => {
  document.getElementById("header").innerHTML = Header();
  
  const mainContainer = document.getElementById("main");

  const {result, findTheLargestLifeSpanButton} = await Main();
  console.log(findTheLargestLifeSpanButton)

  mainContainer.appendChild(result);
  mainContainer.appendChild(findTheLargestLifeSpanButton);

  // result.forEach((img) => {
  //   mainContainer.appendChild(img);
  // });
};

app();
