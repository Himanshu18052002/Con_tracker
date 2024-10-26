import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
