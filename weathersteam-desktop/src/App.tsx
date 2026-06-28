import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={SignInPage} />
      </Routes>
    </HashRouter>
  );
}

export default App;
