import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Telegram from "./Telegram";
import Home from "./Home";
import "rodal/lib/rodal.css";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/telegram/:userId" element={<Telegram />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
