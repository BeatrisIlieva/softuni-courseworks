import Header from "./components/Header";
import Main from "./components/Main";

import "./scss/index.scss";

const app = async () => {
  document.getElementById("header").innerHTML = Header();
  const mainContainer = document.getElementById("main");

  const [catTemplate, dogTemplate] = await Main();
  dogTemplate.forEach((img) => {
    mainContainer.appendChild(img);
  });
  catTemplate.forEach((img) => {
    mainContainer.appendChild(img);
  });


};

app();
