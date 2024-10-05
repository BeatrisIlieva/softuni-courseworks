import Header from "./components/Header";
import Main from "./components/Main";

import "./scss/index.scss";

const app = async () => {
  document.getElementById("header").innerHTML = Header();
  const mainContainer = document.getElementById("main");

  const animals = await Main();
//   const cats = animals[0];
//   const dogs = animals[1];
//   animals.forEach((img) => {
//     mainContainer.appendChild(img);
//   });
};

app();
