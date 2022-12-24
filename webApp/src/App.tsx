import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/main.css";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import Header from "./components/header";
import RegisterPage from "./pages/register";
import LoggedUser from "./pages/loggedUser";
import AuthService from "./services/auth.service";
import PasswordList from "./pages/passwordList";

function App() {
  const authService = new AuthService();
  var isAuthenticated = authService.getLoggedUser() !== null ? true : false;

  return (
    <BrowserRouter>
      <div className="h-screen w-auto">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/:userName"
            element={
              isAuthenticated ? <LoggedUser /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/my-passwords"
            element={
              isAuthenticated ? <PasswordList /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
