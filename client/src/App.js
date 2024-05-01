import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Main } from "../src/components/Main";
import 'normalize.css';


function App() {
  return (
    <div className={styles["app"]}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
