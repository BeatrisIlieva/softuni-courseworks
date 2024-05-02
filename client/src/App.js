import styles from "./App.module.css";
import { Header } from "../src/components/Header/Header";
import { Footer } from "../src/components/Footer/Footer";
import { Main } from "../src/components/Main/Main";
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
