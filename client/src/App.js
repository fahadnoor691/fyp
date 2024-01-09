import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import CarDetail from "./pages/CarDetail";
import AddCar from "./pages/AddCar";
import OwnerMain from "./pages/OwnerMain";
import PrivateRoutes from "./utils/PrivateRoute";
import OwnerLogin from "./pages/OwnerSignin";
import OwnerCars from "./components/OwnerCars";
import EditCar from "./components/OwnerEdit";
import Landing from "./pages/Landing";
import OwnerSignUp from "./pages/OwnerSignUp";
import ChangePassword from "./pages/ChangePassword";
import UpdatePassword from "./pages/UpdatePassword";
import Booking from "./pages/Bookings";
import Payments from "./pages/PaymentForm";
import ChangeOwnerPassword from "./pages/ChangeOwnerPassword";
import UpdateOwnerPass from "./pages/UpdateOwnerPass";
import BookingsOwner from "./pages/BookingOwner";
import About from "./components/About";

import Admin from "./pages/AdminPage";
import Recommendation from "./components/Recommendation";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/owner/login" element={<OwnerLogin />} />
            <Route path="/owner/signup" element={<OwnerSignUp />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route
              path="/change_owner_password"
              element={<ChangeOwnerPassword />}
            />

            <Route path="/update_password/:id" element={<UpdatePassword />} />
            <Route
              path="/update_owner_password/:id"
              element={<UpdateOwnerPass />}
            />

            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />

              <Route path="/bookings" element={<Booking />} />
              <Route path="/owner-bookings" element={<BookingsOwner />} />
              <Route path="/add-a-car" element={<AddCar />} />
              <Route path="/owner/home" element={<OwnerMain />} />
              <Route path="/owner/manage-cars" element={<OwnerCars />} />
              <Route path="/edit-car/:id" element={<EditCar />} />
              <Route path="/car-description/:id" element={<CarDetail />} />
              <Route path="/payment" element={<Payments />} />
              <Route path="/recommendation" element={<Recommendation />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

// <Route path="/home" element={<Home />} />
// <Route path="/bookings" element={<Booking />} />

// <Route path="/car-description/:id" element={<CarDetail />} />
// <Route path="/add-a-car" element={<AddCar />} />

// <Route path="/owner/home" element={<OwnerMain />} />
// <Route path="/owner/manage-cars" element={<OwnerCars />} />
// <Route path="/edit-car/:id" element={<EditCar />} />
// <Route element={<PrivateRoutes />}></Route>
