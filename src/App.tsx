import { Route, Routes } from "react-router-dom";
import "./assets/scss/App.scss";
import Container from "react-bootstrap/Container";
import { CreateRestaurant } from "./Pages/CreateRestaurant";
import HomePage from "./Pages/HomePage";
import EditRestaurant from "./Pages/EditResturant";
import Restaurants from "./Pages/Restaurants";
import Navigation from "./Pages/Partials/Navigation";
import LoggaInPage from "./Pages/LogInPage";
import LoggaUtPage from "./Pages/LogOutPage";
import TipsPageAdmin from "./Pages/TipsPageAdmin";
import { CreateTip } from "./Pages/CreateTip";
import UpdateProfile from "./Pages/UpdateProfile";
import AllAdmin from "./Pages/AllAdmin";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div id="App">
      <Navigation />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/UppdateraProfil" element={<UpdateProfile />} />
          <Route path="/Admins" element={<AllAdmin />} />
          <Route path="/SkapaRestaurang" element={<CreateRestaurant />}></Route>
          <Route path="/Tips" element={<TipsPageAdmin />}></Route>
          <Route path="/Restauranger">
            <Route path="" element={<Restaurants />} />
            <Route path=":id" element={<EditRestaurant />} />
          </Route>
          <Route path="/Loggain" element={<LoggaInPage />} />
          <Route path="/Loggaut" element={<LoggaUtPage />} />
          <Route path="/SkapaTips" element={<CreateTip />} />
        </Routes>
      </Container>
      <ToastContainer/>
    </div>
  );
}

export default App;

