import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./styles/main.css";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import Header from "./components/header/header";
import RegisterPage from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen">
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
