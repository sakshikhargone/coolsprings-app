import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Routes from "./routes/index";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="row ">
          <div className="col-sm-10">
            <Header />
            <hr />
            <Routes />
            <hr />
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
