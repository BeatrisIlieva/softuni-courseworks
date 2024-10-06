import Header from "./components/layout/Header";
import Main from "./components/layout/Main";

import "./scss/index.scss";

const app = async () => {
  document.getElementById("header").innerHTML = Header();
  
  const mainContainer = document.getElementById("main");

  const result = await Main();

  mainContainer.appendChild(result);

  // result.forEach((img) => {
  //   mainContainer.appendChild(img);
  // });
};

app();
