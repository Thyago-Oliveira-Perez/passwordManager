import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/main.css";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import Header from "./components/header/header";
import RegisterPage from "./pages/register";
import LoggedUser from "./pages/loggedUser";
import AuthService from "./services/auth.service";

function App() {
  const PrivateRoute = (children: any) => {
    const authService = new AuthService();

    var isAuthenticated = authService.getLoggedUser() !== null ? true : false;

    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="h-screen w-auto">
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/:userName"
            element={
              <PrivateRoute>
                <LoggedUser />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
