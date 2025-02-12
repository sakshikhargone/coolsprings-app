import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Routes from "./routes/index";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="row mt-2">
          <div className="col-sm-10">
            <Header />
            <Routes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
