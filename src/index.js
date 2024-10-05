import Header from "./components/Header";

import "./scss/index.scss";

const app = () => {
    document.getElementById("header").innerHTML = Header();
}

app()