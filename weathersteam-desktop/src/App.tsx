import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignInPage from "./pages/SignInPage";
import BlankLayout from "./layouts/BlankLayout";
import MainLayout from "./layouts/MainLayout";
import LibraryPage from "./pages/LibraryPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<BlankLayout />}>
          <Route path="/" Component={SignInPage} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/my-library" Component={LibraryPage} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
